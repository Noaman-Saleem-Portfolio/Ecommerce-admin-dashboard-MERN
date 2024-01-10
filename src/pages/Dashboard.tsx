import AdminSidebar from "../components/AdminSidebar"

function Dashboard() {

    return (
      <div className="adminContainer">
        <AdminSidebar />
        <main style={{backgroundColor:"blue"}}>
          main
        </main>
      </div>
    )
  }
  
  export default Dashboard