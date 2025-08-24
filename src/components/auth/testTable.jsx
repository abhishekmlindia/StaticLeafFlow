import DataTable from "./../common/datatable";

function Dashboard() {
  return <div>
  <DataTable url="https://jsonplaceholder.typicode.com/users" perPage= {5} />
  </div>
  }
  
  export default Dashboard;