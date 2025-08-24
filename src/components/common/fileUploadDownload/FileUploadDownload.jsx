import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Spinner, Modal, ProgressBar } from "react-bootstrap";
import { showToast } from "../../../reduxToolKit/toastSlice";
import { apiRequest, fileUploadRequest } from "../../../config/fileService";
import { backendUrl } from "../../../config/appConfig";
import pdficon from "../../../../public/assets/images/svg/pdf.png";
import xlsicon from "../../../../public/assets/images/svg/xls.png";
import TruncateText from "../TruncateText/TruncateText";
import {
  GET_ALL_UPLOADED_FILES,
  UPLOAD_FILE,
  DOWNLOAD_FILE,
  DELETE_FILE,
} from "../../../config/endPointConfig";
import AlertPopup from "../alertpopup/AlertPopup";

const FileUploadDownload = ({
  label = "Upload File",
  acceptedTypes = ".pdf,.xls,.xlsx",
  maxSizeMB = 20,
  onUpload = () => {},
}) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [deletingFileId, setDeletingFileId] = useState(null);
  const [downloadingFileId, setDownloadingFileId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  const commonDataObj = useSelector((state) => state.commonData);
  const userDetailsObj = useSelector((state) => state.loginData);

  const dslId = commonDataObj?.dslId;
  const blockType = commonDataObj?.blockType || "A/B";
  const surveyYear = userDetailsObj?.userDetails?.SurveyYear;
  const tenant = userDetailsObj?.userDetails?.Tenant;
  const uploadedBy = userDetailsObj?.userDetails?.EmployeeId;

  useEffect(() => {
    getAllUploadedFiles();
  }, []);

  const simulateProgress = () => {
    setProgress(0);
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 10;
      if (value >= 90) {
        clearInterval(interval);
      } else {
        setProgress(Math.floor(value));
      }
    }, 200);
    return () => clearInterval(interval);
  };

  const getAllUploadedFiles = async () => {
    if (!dslId || !blockType) return;
    setIsLoadingFiles(true);
    const stopProgress = simulateProgress();

    try {
      const params = new URLSearchParams({
        DSLId: dslId,
        BlockType: blockType,
      });
      const url = `${backendUrl}${GET_ALL_UPLOADED_FILES}?${params.toString()}`;
      const response = await apiRequest(url, null, "get");

      // Log full response to debug structure if needed
      // console.log("API file list response:", response);

      let normalizedFiles = [];

      if (Array.isArray(response) && response.length > 0) {
        normalizedFiles = response.map((f) => ({
          fileId: f.id,
          fileName: f.fileName,
          uploadedAt: f.uploadedAt,
        }));
      } else {
        dispatch(
          showToast({ type: "info", message: "There are no uploaded files." })
        );
      }

      setUploadedFiles(normalizedFiles);
      setProgress(100);
    } catch (error) {
      console.error("Failed to load files:", error);
      dispatch(
        showToast({ type: "error", message: "Failed to load uploaded files." })
      );
    } finally {
      stopProgress();
      setTimeout(() => {
        setIsLoadingFiles(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      const allowed = acceptedTypes.replace(/\./g, "").split(",");

      if (!allowed.includes(extension)) {
        dispatch(showToast({ type: "error", message: "Invalid file type." }));
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        dispatch(
          showToast({
            type: "error",
            message: `File size exceeds ${maxSizeMB} MB.`,
          })
        );
        return;
      }

      setFileName(file.name);
      setFileSelected(true);
    }
  };

  const handleUpload = async () => {
    const fileInput = document.getElementById("file-input");
    const file = fileInput?.files?.[0];

    if (!file || !dslId || !blockType || !file.name || !uploadedBy) {
      dispatch(
        showToast({
          type: "error",
          message: "Missing required fields or file.",
        })
      );
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("File", file);
    formData.append("DSLId", dslId);
    formData.append("BlockType", blockType);
    formData.append("Name", file.name);
    formData.append("UploadedBy", uploadedBy);

    try {
      const response = await fileUploadRequest(
        backendUrl + UPLOAD_FILE,
        formData,
        "post",
        true,
        {},
        "multipart/form-data"
      );

      const newFile = {
        fileId: response?.fileId || response?.id,
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
      };

      if (newFile.fileId) {
        setUploadedFiles((prev) => [...prev, newFile]);
        dispatch(
          showToast({ type: "success", message: "File uploaded successfully." })
        );
        onUpload(file.name);
        resetFile();
      } else {
        throw new Error("fileId missing in upload response");
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage = error?.response?.data?.message || error?.message;
      if (
        errorMessage?.includes("Cannot insert duplicate key row") &&
        errorMessage?.includes("IX_FileStore_UniqueUpload_Active")
      ) {
        dispatch(
          showToast({
            type: "error",
            message: "This file is already uploaded.",
          })
        );
      } else {
        dispatch(showToast({ type: "error", message: "Upload failed." }));
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (fileId, fileName) => {
    if (!fileId) {
      dispatch(
        showToast({ type: "error", message: "Invalid file ID for download." })
      );
      return;
    }

    setDownloadingFileId(fileId);
    setProgress(0);

    const simulateProgress = () => {
      let value = 0;
      const interval = setInterval(() => {
        value += Math.random() * 15;
        if (value >= 90) {
          clearInterval(interval);
        } else {
          setProgress(Math.floor(value));
        }
      }, 200);
      return () => clearInterval(interval);
    };

    const stopProgress = simulateProgress();

    try {
      const params = new URLSearchParams({
        Id: fileId,
        DSLId: dslId,
        SurveyYear: surveyYear,
        Tenant: tenant,
        BlockType: blockType,
        FileName: fileName,
      });

      const url = `${backendUrl}${DOWNLOAD_FILE}?${params.toString()}`;
      const response = await apiRequest(url, null, "get");

      const base64String = response?.data;
      const mimeType = response?.contentType || "application/octet-stream";
      const actualFileName = response?.fileName || fileName;

      if (!base64String) throw new Error("No file data received");

      const byteCharacters = atob(base64String);
      const byteArrays = [];

      for (let i = 0; i < byteCharacters.length; i += 512) {
        const slice = byteCharacters.slice(i, i + 512);
        const byteNumbers = new Array(slice.length);
        for (let j = 0; j < slice.length; j++) {
          byteNumbers[j] = slice.charCodeAt(j);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: mimeType });
      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = actualFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(downloadUrl);

      setProgress(100);
    } catch (error) {
      console.error("Download error:", error);
      dispatch(showToast({ type: "error", message: "Download failed." }));
    } finally {
      stopProgress();
      setTimeout(() => {
        setProgress(0);
        setDownloadingFileId(null);
      }, 500);
    }
  };

  const confirmDelete = (file) => {
    setFileToDelete(file);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!fileToDelete?.fileId) {
      dispatch(
        showToast({ type: "error", message: "Invalid file for deletion." })
      );
      return;
    }

    const fileIdToDelete = fileToDelete.fileId;
    setDeletingFileId(fileIdToDelete);

    try {
      const response = await apiRequest(
        `${backendUrl}${DELETE_FILE}/${fileIdToDelete}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) throw new Error("Delete failed");

      setUploadedFiles((prev) =>
        prev.filter((f) => f.fileId !== fileIdToDelete)
      );
      dispatch(showToast({ type: "success", message: "File deleted." }));
    } catch (error) {
      console.error("Delete error:", error);
      dispatch(showToast({ type: "error", message: "Delete error." }));
    } finally {
      setDeletingFileId(null);
      setShowConfirmModal(false);
      setFileToDelete(null);
    }
  };

  const resetFile = () => {
    setFileName("");
    setFileSelected(false);
    const input = document.getElementById("file-input");
    if (input) input.value = "";
  };

  const getIconByExtension = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (ext === "pdf") return pdficon;
    if (["xls", "xlsx"].includes(ext)) return xlsicon;
    return pdficon;
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <div className="d-flex justify-content-start mb-1">
        <Form.Control
          type="file"
          className="d-none"
          id="file-input"
          accept={acceptedTypes}
          onChange={handleFileChange}
        />
        <Form.Control type="text" className="me-2" value={fileName} readOnly />

        {!fileSelected && (
          <Button
            variant="outline-primary"
            className="d-flex align-items-center me-2"
            onClick={() => document.getElementById("file-input").click()}
          >
            <span className="me-2">Browse</span>
            <i className="bi bi-file-earmark ms-1"></i>
          </Button>
        )}

        {isUploading ? (
          <Button variant="primary" disabled className="me-2">
            <Spinner animation="border" size="sm" className="me-2" />
            Uploading...
          </Button>
        ) : (
          fileSelected && (
            <Button
              variant="primary"
              className="d-flex align-items-center me-2"
              onClick={handleUpload}
            >
              <span className="me-2">Upload</span>
              <i className="bi bi-upload ms-1"></i>
            </Button>
          )
        )}

        {fileSelected && (
          <Button
            variant="outline-danger"
            className="d-flex align-items-center me-2"
            onClick={resetFile}
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        )}
      </div>

      <Form.Text className="text-muted">
        Allowed Extensions: {acceptedTypes}. Max Size: {maxSizeMB}MB.
      </Form.Text>

      {isLoadingFiles && (
        <div className="mt-3">
          <ProgressBar
            variant="primary"
            className="bg-light mt-0 mb-3"
            now={progress}
            label={`${progress}%`}
            animated
          />
        </div>
      )}

      {!isLoadingFiles && uploadedFiles.length > 0 && (
        <div className="mt-3">
          <strong>Uploaded Files:</strong>
          <ul className="list-unstyled mt-2 d-flex justify-content-start flex-wrap">
            {uploadedFiles.map((file) => (
              <li
                key={file.fileId}
                className="d-flex align-items-center justify-content-between mb-1 me-2"
              >
                <div className="bgLightBlue shadow-none border mt-1 rounded-4 card">
                  <div
                    className="card-body d-flex align-items-center px-2 py-2"
                    style={{ width: "232px" }}
                  >
                    <img
                      src={getIconByExtension(file.fileName)}
                      alt=""
                      width={40}
                      className="me-2"
                    />
                    <div>
                      {downloadingFileId === file.fileId ? (
                        <>
                          Downloading... {progress}%{" "}
                          <Spinner animation="border" size="sm" />
                        </>
                      ) : (
                        <Link
                          className="text-dark"
                          title="Click to download"
                          onClick={() =>
                            handleDownload(file.fileId, file.fileName)
                          }
                        >
                          <p className="mb-0">
                            <TruncateText
                              text={file.fileName}
                              maxLength={20}
                              withExtensionHandling={true}
                            />
                          </p>
                          <small className="text-muted">
                            {new Date(file.uploadedAt).toLocaleString()}
                          </small>
                        </Link>
                      )}
                    </div>
                    <Link
                      className="text-danger p-0 ms-auto"
                      title="Delete file"
                      onClick={() => confirmDelete(file)}
                      disabled={deletingFileId === file.fileId}
                    >
                      {deletingFileId === file.fileId ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <i className="bi bi-trash-fill"></i>
                      )}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AlertPopup
        title="Delete this File?"
        description="Are you sure you want to delete this file? This action cannot be undone."
        confirmbtnText="Yes Delete"
        closeBtnText="No, Cancel"
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        variant="danger"
        onConfirm={handleDeleteConfirmed}
      />
    </Form.Group>
  );
};

export default FileUploadDownload;
