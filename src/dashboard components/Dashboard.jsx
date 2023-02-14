import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styles from "./Dashboard.module.scss"
import {MdAccountCircle} from "react-icons/md"
import {TbListSearch} from "react-icons/tb"
import {GiBlackBook} from "react-icons/gi"
import {CiEdit} from "react-icons/ci"
import {ImBooks} from "react-icons/im"
import {RiDashboardFill} from 'react-icons/ri'
import {HiUsers} from "react-icons/hi"
import {AiOutlineDelete} from "react-icons/ai"
import axios from 'axios'
import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';



function Dashboard() {
    const navigate=useNavigate()
    const [pageLoading,setPageLoading]=useState(true)
    const [pageData,setPageData]=useState(false)
    const[bookLoading,setBookLoading]=useState(false)

const[storeLoginby,setStoreLoginby]=useState([])
const[storeBooks,setStoreBooks]=useState([])
const removeLocalkey = () => {
  localStorage.removeItem("loadkey");

};

    useEffect(()=>{
    // setPageLoading(true)
    if(localStorage.ticket=== undefined){
setPageData(true)
    }else if(localStorage.loadkey==="loading"){
        // setPageLoading(true)
        getLoginBy()
        getbooks()
      
        setTimeout(() => 
        setPageLoading(false), 6000);
        setTimeout(() => 
removeLocalkey()
, 7000);


    }else  if(localStorage.loadkey=== undefined){
      setPageLoading(false)

      getLoginBy()
      getbooks()
      // setForSearch.target.value("") 


    }

    },[])

    const getLoginBy = async () => {
        try {

          const server = await axios.get(
            `${config.api}/admin/login_by/${localStorage.getItem(
              "ticket"
            )}`
          );

          setStoreLoginby(server.data);
        } catch (error) {
        }
      };
    
      const getbooks = async () => {
        try {
          setBookLoading(true)
          const server = await axios.get(
            `${config.api}/view_books`
          );

          setStoreBooks(server.data);
          setBookLoading(false)

          console.log(server.data)
        } catch (error) {
        }
      };
        const removeLocalstorgae = () => {
          localStorage.removeItem("ticket");
      
          navigate("/");
        };
const openaddbooks=()=>{
  navigate("/addbooks")
}

const [openDelete,setOpenDelete]=useState(false)
const [storeDeletingName,setStoreDeletingName]=useState([])
const [storeDeletingId,setStoreDeletingId]=useState([])
const[deleteLoading,setDeleteLoading]=useState(true)

const opendelete=(name,_id)=>{
setOpenDelete(true)
setStoreDeletingName(name)
setStoreDeletingId(_id)

}

const deletebook= async (_id) => {
  try {
    setDeleteLoading(false)

    const server = await axios.delete(`${config.api}/delete_book/${_id}`);
    if (server.data.message === "book deleted successfully") {
        toast.success("Book deleted successfully", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setOpenDelete(false)
    setDeleteLoading(true)
    


        setTimeout(() => getbooks(), 1500);

      }
     
  } catch (error) {
    alert("error");
  }
}

const[forSearch,setForSearch]=useState([])
// console.log(forSearch)
  return (
   <>
  
   {pageData? <>
    <div className={styles.page_bg}>

    <h1>please Login</h1></div>
   </> :
   <>
     {pageLoading ?<>

<div className='bookbg'>
<div class=" book">
  <figure class="page"></figure>
  <figure class="page"></figure>
  <figure class="page"></figure>
</div>

<h1 className='loadingh1'>Reading</h1>
       
   </div>
        </>:
         <>
        {/* {localStorage.loadkey===undefined?<>
        
<div className='bookbg pindex'>
<div class="loader book">
  <figure class="page"></figure>
  <figure class="page"></figure>
  <figure class="page"></figure>
</div>

<h1 className='loadingh1'>Reading</h1>
       
   </div>
        </>:""} */}
         <div className={styles.page_bg}>
         <div className={styles.nav_bar}>
                <div className={styles.company_name}>
                 <h2>Secert Bookracks</h2>
                </div>
                <div className={styles.others}>
                  <ul>
                    <li>
                      {/* <li ><ImBooks/> Books</li>
                       */}
                       <li><RiDashboardFill/>Dashboard</li>
                    </li>
                    <li onClick={()=>{navigate("/user")}} ><HiUsers/> Users</li>
      
                  
                  </ul>
      
                
                </div>
              </div>
      
                <div className={styles.login_person_admin}>
                    <div className={styles.details}>
                    {/* <span>|</span> */}
                    {/* <span>
                      <MdAccountCircle />
                    </span> */}
      
                    <span>
                      {/* {storeLoginby.name} */}{storeLoginby.name}
                      </span>
                    {/* <span>|</span> */}
                    </div>

                  <div className={styles.logout} onClick={removeLocalstorgae}>Logout</div>

      
                  </div>

                  <div className={styles.bookdiv}>
                  <div className={styles.search_content}>
                  <h4 onClick={openaddbooks}><GiBlackBook/> Add New Books</h4> 
          <div className={styles.search_bar}>
          <div
                  id="inputs"
                
                >
                  <input
                    // type="text"
                    list='data'
                    placeholder="Type book name's to search"
                    name="text"
                    // value={formik.values.password}
                    onChange={setForSearch}
                    // onBlur={getbooks()}
                    // required
                    id="inputss"
                  />
                  <datalist id='data'>
                

                    {storeBooks.map((get)=>{
return(
  <>
  <option value={get.book_name}></option>
  </>
)
                    })}

                  </datalist>
                  <span className="shows"  >
                    <TbListSearch/> Search
                  </span>
                </div>
          </div>

          <div className={styles.bookcontainer}>
          {
            bookLoading?<>
           <div class="box">
    <div class="bouncing-bar">
      <div class="line line_two"></div>
      <div class="line line_two"></div>
      <div class="line line_two"></div>
      <div class="line line_two"></div>
    </div>
  </div>
            </>:
            <>
              {
              storeBooks.map((get)=>{
                return(
<>



{/* {
forSearch ==="" 
 || 
 forSearch.target.value!==get.book_name 
 forSearch.target.value===undefined


?<>
{console.log("one")} */}

  <div className={styles.book_box}>
{/* // style={{backgroundImage:`url(${get.cover_photo})`}} */}

 <div className={styles.book_box_top}>
  <div className={styles.book_box_top_btn_left}
  >
<h2   
  // onClick={openupdate(get._id)}

>

<Link className={styles.link} to={`/updatebooks/${get._id}`}>
<CiEdit/>

</Link>
</h2>
    </div>
<div className={styles.book_box_img}>
  <img src={get.cover_photo}/>
</div>
  <div className={styles.book_box_top_btn_right}>
    <h2 
    onClick={()=>opendelete(get.book_name,get._id)}
    >
      <AiOutlineDelete/>
    </h2>
    </div>
  
 </div>
 <div className={styles.book_box_bottom}>
  <h5><b>Name : </b>{get.book_name}</h5>
  <h5><b>Author : </b>{get.author}</h5>
  <div>
    <h5><b>Total Books : </b>{get.quantity}</h5>
    <h5><b>On Rack : </b>2</h5>
    </div>
    <h5><b>Status : </b>{get.status}</h5>

    <a  target="_blank" href={get.documentation}>for documentation click here</a>
  
  </div>

  </div>
{/* </>:""} */}
{/* {forSearch.target.value === get.book_name ?<>
{console.log("one")}
  <div className={styles.book_box}>

 <div className={styles.book_box_top}>
  <div className={styles.book_box_top_btn_left}
  >
<h2   

>

<Link className={styles.link} to={`/updatebooks/${get._id}`}>
<CiEdit/>

</Link>
</h2>
    </div>
<div className={styles.book_box_img}>
  <img src={get.cover_photo}/>
</div>
  <div className={styles.book_box_top_btn_right}>
    <h2 
    onClick={()=>opendelete(get.book_name,get._id)}
    >
      <AiOutlineDelete/>
    </h2>
    </div>
  
 </div>
 <div className={styles.book_box_bottom}>
  <h5><b>Name : </b>{get.book_name}</h5>
  <h5><b>Author : </b>{get.author}</h5>
  <div>
    <h5><b>Total Books : </b>{get.quantity}</h5>
    <h5><b>On Rack : </b>2</h5>
    </div>
    <h5><b>Status : </b>{get.status}</h5>

    <a  target="_blank" href={get.documentation}>for documentation click here</a>
  
  </div>

  </div>
</>:""} */}

</>  )      
      })
            }
            </>
          }
          </div>
        </div>
                  </div>
         </div>
         </>
        }
        </>
   }
   

   {openDelete?<>
<div className={styles.delete_div}>
  <div className={styles.delete_bg}
    onClick={()=>{setOpenDelete(false);setDeleteLoading(true)}}
  ></div>
  <div className={styles.content_box}>
    { deleteLoading?<>
      <h2>Are sure want delete<span> {storeDeletingName} </span>  ?</h2>
    <div className={styles.content_box_btn}>
      <button className={`forbuttonfullscreen ${styles.red_btn}`}
      onClick={()=>{setOpenDelete(false)}}
      >
No
      </button>
      <button className={`forbuttonfullscreen ${styles.green_btn}`}
        onClick={()=>{deletebook(storeDeletingId)}}
      >
Yes
      </button>
    </div>

    </>:<>
    <h2> deleting <span> {storeDeletingName} </span> ?</h2>
    <div className={styles.content_box_btn}>
    <div class="box">
    <div class="bouncing-bar">
      <div class="line line_two"></div>
      <div class="line line_two"></div>
      <div class="line line_two"></div>
      <div class="line line_two"></div>
    </div>
  </div></div>
    </>}
  
  </div>
  
</div>
</>:""}



<ToastContainer
            transition={Flip}
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

   </>
  )
}

export default Dashboard



// https://avatars.dicebear.com/v2/avataaars/vijay.svg?options[mood][]=happy