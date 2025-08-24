export const returnFormValidation = (requiredFields = [], fieldDetails = {}) => {
    let SuccessFlag = true;
    requiredFields.map((val) => {
        if (!fieldDetails[val])
            SuccessFlag = false;
    }
    )
    return SuccessFlag;
};

export const errorTypes = {
    FOD_HARD_ERROR: 1,
    NOT_DEFINED: 2,
    FOD_SOFT_ERROR: 3,
    CSO_SOFT_ERROR: 4,
};

export const dashboardRoutes = [{ name: 'processDashboard', value: 1 }, { name: 'businessDashboard', value: 2 }, { name: 'infrastructureDashboard', value: 3 }, { name: 'applicationDashboard', value: 4 }, { name: 'processDashboardSettings', value: 5 }, { name: 'applicationDashboardSettings', value: 6 }, { name: 'dashboardSettings', value: 7 }, { name: 'home', value: 8 }];
export const permissionDetails = [{ "menuCode": "HOME_VIEW", "isActive": true }, { "menuCode": "BLOCK_AB", "isActive": true }, { "menuCode": "BLOCK_C", "isActive": true }, { "menuCode": "BALANCE_SHEET", "isActive": true }, { "menuCode": "PROFIT_LOSS", "isActive": true }, { "menuCode": "BLOCK_E", "isActive": true }, { "menuCode": "BLOCK_H", "isActive": true }, { "menuCode": "BLOCK_I", "isActive": true }, { "menuCode": "BLOCK_J", "isActive": true }, { "menuCode": "BLOCK_K", "isActive": true }, { "menuCode": "PART_A1", "isActive": true }, { "menuCode": "PART_A2", "isActive": true }, { "menuCode": "FINAL", "isActive": true }];

export const warningDetails = [{id: 1, blockId: 1, blockName: 'A', title: 'warningMsg'}, {id: 2, blockId: 2, blockName: 'B', title: 'warningMsg'}];
export const errorDetails = [{id: 1, blockId: 1, blockName: 'A', title: 'errorMsg'}, {id: 2, blockId: 2, blockName: 'B', title: 'errorMsg' }];

export const blockErrors = [
    {
        "id": 1,
        "index": "name",
        "title": "Name is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 2,
        "index": "address1",
        "title": "Address1 is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 3,
        "index": "villageTown",
        "title": "Village/Town is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 4,
        "index": "district",
        "title": "District is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 5,
        "index": "state",
        "title": "State is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 6,
        "index": "pincode",
        "title": "Pincode is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 7,
        "index": "organization",
        "title": "Organization is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 8,
        "index": "isoCertification",
        "title": "ISO Certification is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 9,
        "index": "formalTraining",
        "title": "Formal Training is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 10,
        "index": "contactPersonName",
        "title": "Contact Person Name is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    },
    {
        "id": 11,
        "index": "contactPersonDesignation",
        "title": "Contact Person Designation is required",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    }
];

export const blockWarnings = [
    {
        "id": 1,
        "index": "monthsOfOperation",
        "title": "No. of months of operation should be between 1 and 12",
        "blockName": "B",
        "rowNo": "-",
        "isValidate": false
    }
];
