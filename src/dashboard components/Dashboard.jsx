import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import { MdAccountCircle } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";
import { GiBlackBook } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { ImBooks } from "react-icons/im";
import { RiDashboardFill } from "react-icons/ri";
import { RiChatHistoryFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdSpeakerNotes } from "react-icons/md";
import rack1 from "../assets/booknew.png";

import { BsFillPinAngleFill } from "react-icons/bs";
import { BsFillBookmarkStarFill } from "react-icons/bs";

import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { GiWhiteBook } from "react-icons/gi";
import axios from "axios";
import { config } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [pageData, setPageData] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);

  const [storeLoginby, setStoreLoginby] = useState([]);
  const [storeBooks, setStoreBooks] = useState([]);
  const removeLocalkey = () => {
    localStorage.removeItem("loadkey");
  };

  useEffect(() => {
    if (localStorage.ticket === undefined) {
      setPageData(true);
    } else if (localStorage.loadkey === "loading") {
      getDisplayCounts();

      getLoginBy();
      getbooks();
      setTimeout(() => setPageLoading(false), 6000);
      setTimeout(() => removeLocalkey(), 7000);
    } else if (localStorage.loadkey === undefined) {
      setPageLoading(false);
      getDisplayCounts();

      getLoginBy();
      getbooks();
    }
  }, []);

  const [storeCounts, setStoreCounts] = useState([]);

  const getDisplayCounts = async () => {
    try {
      const server = await axios.get(`${config.api}/display_counts`);

      setStoreCounts(server.data);
    } catch (error) {}
  };

  const getLoginBy = async () => {
    try {
      const server = await axios.get(
        `${config.api}/admin/login_by/${localStorage.getItem("ticket")}`
      );

      setStoreLoginby(server.data);
    } catch (error) {}
  };

  const getbooks = async () => {
    try {
      setBookLoading(true);
      const server = await axios.get(`${config.api}/view_books`);

      setStoreBooks(server.data);
      setBookLoading(false);
    } catch (error) {}
  };
  const getbooksnoloading = async () => {
    try {
      const server = await axios.get(`${config.api}/view_books`);

      setStoreBooks(server.data);
    } catch (error) {}
  };

  const removeLocalstorgae = () => {
    localStorage.removeItem("ticket");

    navigate("/");
  };
  const openaddbooks = () => {
    navigate("/addbooks");
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [storeDeletingName, setStoreDeletingName] = useState([]);
  const [storeDeletingId, setStoreDeletingId] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(true);

  const opendelete = (name, _id) => {
    setOpenDelete(true);
    setStoreDeletingName(name);
    setStoreDeletingId(_id);
  };

  const deletebook = async (_id) => {
    try {
      setDeleteLoading(false);

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
        setOpenDelete(false);
        setDeleteLoading(true);

        getbooksnoloading();
      }
    } catch (error) {
      alert("error");
    }
  };

  const [forSearch, setForSearch] = useState("");
  return (
    <>
      {pageData ? (
        <>
          <div className={styles.page_bg}>
            <h1>please Login</h1>
          </div>
        </>
      ) : (
        <>
          {pageLoading ? (
            <>
              <div className="bookbg">
                <div class=" book">
                  <figure class="page"></figure>
                  <figure class="page"></figure>
                  <figure class="page"></figure>
                </div>

                <h1 className="loadingh1">Reading</h1>
              </div>
            </>
          ) : (
            <>
              <div className={styles.page_bg}>
                <div className={styles.nav_bar}>
                  <div className={styles.company_name}>
                    <p>
                      secert <b>Bookracks</b>
                    </p>
                  </div>
                  <div className={styles.others}>
                    <ul>
                      <li>
                        <li>
                          <RiDashboardFill />
                          Books
                        </li>
                      </li>
                      <li
                        onClick={() => {
                          navigate("/user");
                        }}
                      >
                        <HiUsers /> Users
                      </li>

                      <li
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        <MdSpeakerNotes /> Register
                      </li>

                      <li
                        onClick={() => {
                          navigate("/history");
                        }}
                      >
                        <RiChatHistoryFill />
                        History
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.login_person_admin}>
                  <div className={styles.details}>
                    <span>{storeLoginby.name}</span>
                  </div>

                  <div className={styles.logout} onClick={removeLocalstorgae}>
                    Logout
                  </div>
                </div>

                <div className={styles.dcparent}>
                  <div className={styles.displaycon}>
                    <div className={styles.dcbox}>
                      <div className={styles.dcbox_top}>
                        <h3>{storeCounts.totalbooks}</h3>
                      </div>
                      <div className={styles.dcbox_down}>
                        <span>
                          Total <br /> Books
                        </span>
                        <span className={styles.dcbox_down_logo}>
                          <GiWhiteBook />
                        </span>
                      </div>
                    </div>
                    <div className={styles.dcbox}>
                      <div className={styles.dcbox_top}>
                        <h3>{storeCounts.totalbooksborrowed}</h3>
                      </div>
                      <div className={styles.dcbox_down}>
                        <span>
                          Borrowed <br /> Books
                        </span>
                        <span className={styles.dcbox_down_logo}>
                          <BsFillArrowUpRightCircleFill />
                        </span>
                      </div>
                    </div>
                    <div className={styles.dcbox}>
                      <div className={styles.dcbox_top}>
                        <h3>{storeCounts.duebooks}</h3>
                      </div>
                      <div className={styles.dcbox_down}>
                        <span>
                          Due <br /> Books
                        </span>
                        <span className={styles.dcbox_down_logo}>
                          <BsFillPinAngleFill />
                        </span>
                      </div>
                    </div>
                    <div className={styles.dcbox}>
                      <div className={styles.dcbox_top}>
                        <h3>{storeCounts.todayreturns}</h3>
                      </div>
                      <div className={styles.dcbox_down}>
                        <span>
                          Today <br /> Returns
                        </span>
                        <span className={styles.dcbox_down_logo}>
                          <BsFillBookmarkStarFill />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.displayimgrack}>
                    <img src={rack1} />
                  </div>
                </div>

                <div className={styles.bookdiv}>
                  <div className={styles.search_content}>
                    <h4 onClick={openaddbooks}>
                      <GiBlackBook /> Add New Books
                    </h4>
                    <div className={styles.search_bar}>
                      <div id="inputs">
                        <input
                          list="data"
                          placeholder="Type book name's to search"
                          name="text"
                          onChange={(e) => setForSearch(e.target.value)}
                          id="inputss"
                        />
                        <datalist id="data">
                          {storeBooks.map((get) => {
                            return (
                              <>
                                <option
                                  value={get.book_name.toLowerCase()}
                                ></option>
                              </>
                            );
                          })}
                        </datalist>
                        <span className="shows">
                          <TbListSearch /> Search
                        </span>
                      </div>
                    </div>

                    <div className={styles.bookcontainer}>
                      {bookLoading ? (
                        <>
                          <div class="box">
                            <div class="bouncing-bar">
                              <div class="line line_two"></div>
                              <div class="line line_two"></div>
                              <div class="line line_two"></div>
                              <div class="line line_two"></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {storeBooks
                            .filter((p) =>
                              p.book_name.toLowerCase().includes(forSearch)
                            )
                            .map((get) => {
                              return (
                                <>
                                  <div className={styles.book_box}>
                                    <div className={styles.book_box_top}>
                                      <div
                                        className={styles.book_box_top_btn_left}
                                      >
                                        <h2>
                                          <Link
                                            className={styles.link}
                                            to={`/updatebooks/${get._id}`}
                                          >
                                            <CiEdit />
                                          </Link>
                                        </h2>
                                      </div>
                                      <div className={styles.book_box_img}>
                                        <img src={get.cover_photo} />
                                      </div>
                                      <div
                                        className={
                                          styles.book_box_top_btn_right
                                        }
                                      >
                                        <h2
                                          onClick={() =>
                                            opendelete(get.book_name, get._id)
                                          }
                                        >
                                          <AiOutlineDelete />
                                        </h2>
                                      </div>
                                    </div>
                                    <div className={styles.book_box_bottom}>
                                      <h5>
                                        <b>Name : </b>
                                        {get.book_name}
                                      </h5>
                                      <h5>
                                        <b>Author : </b>
                                        {get.author}
                                      </h5>
                                      <h5>
                                        <b>Total books : </b>
                                        {get.quantity + get.onrack}
                                      </h5>

                                      <div>
                                        <h5>
                                          <b>Onrack : </b>
                                          {get.quantity}
                                        </h5>
                                        <h5>
                                          <b>Borrowed : </b>
                                          {get.onrack}
                                        </h5>
                                      </div>
                                      <h5>
                                        <b>Status : </b>{" "}
                                        <span
                                          className={
                                            get.status === "available"
                                              ? "forgreencolor"
                                              : "forredcolor"
                                          }
                                        >
                                          {get.status}
                                        </span>{" "}
                                      </h5>

                                      <a
                                        target="_blank"
                                        href={get.documentation}
                                      >
                                        for documentation click here
                                      </a>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.footer}>
                  <h5>Powered-by</h5>
                  <p>
                    secert <b>Bookracks</b>
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {openDelete ? (
        <>
          <div className={styles.delete_div}>
            <div
              className={styles.delete_bg}
              onClick={() => {
                setOpenDelete(false);
                setDeleteLoading(true);
              }}
            ></div>
            <div className={styles.content_box}>
              {deleteLoading ? (
                <>
                  <h2>
                    Are sure want delete<span> {storeDeletingName} </span> ?
                  </h2>
                  <div className={styles.content_box_btn}>
                    <button
                      className={`forbuttonfullscreen ${styles.red_btn}`}
                      onClick={() => {
                        setOpenDelete(false);
                      }}
                    >
                      No
                    </button>
                    <button
                      className={`forbuttonfullscreen ${styles.green_btn}`}
                      onClick={() => {
                        deletebook(storeDeletingId);
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>
                    {" "}
                    deleting <span> {storeDeletingName} </span> ?
                  </h2>
                  <div className={styles.content_box_btn}>
                    <div class="box">
                      <div class="bouncing-bar">
                        <div class="line line_two"></div>
                        <div class="line line_two"></div>
                        <div class="line line_two"></div>
                        <div class="line line_two"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

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
  );
}

export default Dashboard;
