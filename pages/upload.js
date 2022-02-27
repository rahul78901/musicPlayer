import Head from 'next/head';
import styles from '../styles/Upload.module.css';
import {
  storage
} from "../utlis/fb.js";
import {
  useState
} from 'react';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import {
  v4
} from "uuid";

export default function Home() {

  const [musicUrl,
    setMusicUrl] = useState("");
  const [imageUrl,
    setImageUrl] = useState("");
  const [music,
    setMusic] = useState(null);
  const [image,
    setImage] = useState(null);
  const [name,
    setName] = useState('');
  const [progress,
    setPro] = useState(0);

  function SUBMIT(e) {
    e.preventDefault();

    const imgRef = ref(storage, `music/image/${v4()}${image.name}`);
    const upTask = uploadBytesResumable(imgRef, image);
    const musicRef = ref(storage, `music/music/${v4()}${music.name}`);
    const upTask2 = uploadBytesResumable(musicRef, music);

    upTask.on('state_changed',
      (snapshot) => {},
      (error) => {
        alert(JSON.stringify({
          error
        }));
      },
      () => {
        getDownloadURL(upTask.snapshot.ref).then((imageUrl) => {
          setImageUrl(imageUrl);
          upTask2.on('state_changed',
            (snapshot) => {},
            (error2) => {
              alert(JSON.stringify({
                error2
              }));
            },
            () => {
              getDownloadURL(upTask2.snapshot.ref).then((musicUrl) => {
                setMusic(musicUrl);
                const data = {
                  name,
                  music:musicUrl,
                  image:imageUrl
                };
                fetch("/api/upload", {
                  method:"post",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data)
                }).then(_=> {
                  window.location.href = "/";
                }).catch(e=> {
                  alert(JSON.stringify({
                    e
                  }));
                });
              });
            }
          );
        });
      }
    );
  }

  return (
    <>
      <Head>
        <title>Music | Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.one}></div>
      <div className={styles.two}></div>
      <div className={styles.three}></div>
      <section className={styles.section}>
        <form className={styles['login-from']} onSubmit={e=>SUBMIT(e)}>
          <div className={styles.errors}>
            <div className={styles.error}>
              <p>
                Image Is Required
              </p>
            </div>
          </div>
          <div style={ { animationDelay: "-1s" }} className={`${styles.card} ${styles.c1}`}></div>
          <div style={ { animationDelay: "-4s" }} className={`${styles.card} ${styles.c2}`}></div>
          <div style={ { animationDelay: "-3s" }} className={`${styles.card} ${styles.c3}`}></div>
          <h3>Upload Music</h3>
          <div className={styles["input-div"]}>
            <input type="text" required value={name} onChange={e=>setName(e.target.value)} placeholder="Enter Music Name..." />
          </div>
          <div className={`${styles['input-div']} ${styles.file}`}>
            <label>Select Music File</label>
            <input required type="file" accept="audio/*" onChange={e=>setMusic(e.target.files[0])} />
          </div>
          <div className={`${styles["input-div"]} ${styles.sub}`}>
            <label>Select Image</label>
            <input required onChange={e=>setImage(e.target.files[0])} type="file" accept="image/*" />
          </div>
          <div className={`${styles["input-div"]} ${styles.sub}`}>
            <input type="submit" value="Upload" />
          </div>
        </form>
      </section>
    </>
  )
}