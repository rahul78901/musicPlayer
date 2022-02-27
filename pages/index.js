import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  useState,
  useEffect,
  useRef
} from 'react';

export default function Home() {
  const [musics,
    setMusics] = useState([]);
  const [volume,
    setVolume] = useState(1);
  const [range,
    setRange] = useState(0);
  const [index,
    setIndex] = useState(0);
  const Audio = useRef(null);
  const val = useRef(null);
  const CurrentTime = useRef(null);
  const Duration = useRef(null);
  const progressBar = useRef(null);

  function prev() {
    setIndex(e=> {
      if (e > 0) return e - 1;
      return musics.length - 1;
    });
  }
  function next() {
    setIndex(e=> {
      if (e < (musics.length -1)) return e+1;
      return 0;
    });
  }
  function playPouse() {
    const Current = Audio.current;
    if (Current.paused) {
      Current.play();
    } else {
      Current.pause();
    }
  }
  function Volume() {
    val.current.classList.toggle(styles.active);
  }
  function Range(e) {
    Audio.current.currentTime = e.target.value;
    Audio.current.play();
  }

  function updateTime(e) {
    const duration = e.target.duration;
    const currentTime = e.target.currentTime;
    const hr = Math.floor(duration/3600);
    const mn = Math.floor(duration/60);
    const sc = Math.floor(duration%60);
    Duration.current.innerHTML = `${hr?(hr < 10?'0'+hr: hr)+':': ''}${mn < 10?'0'+mn: mn}:${sc < 10?'0'+sc: sc}`;
    setVolume(Audio.current.volume);
    progressBar.current.max = duration;
    setRange(currentTime);
    progressBar.current.value = currentTime;
  const hr2 = Math.floor(currentTime/3600);
  const mn2 = Math.floor(currentTime/60);
  const sc2 = Math.floor(currentTime%60);
  CurrentTime.current.innerHTML=`${hr2?(hr2 < 10?'0'+hr2: hr2)+':': ''}${mn2 < 10?'0'+mn2: mn2}:${sc2 < 10?'0'+sc2: sc2}`;
  }

  useEffect(()=> {
    fetch("/api/get").then(res=>res.json()).then(data=> {
      setMusics(data.data);
    })
    .catch(err=> {
      window.location.reload();
    });
  }, []);

  useEffect(()=> {
    Audio.current.onplay = ((e)=> {
      updateTime(e);
    });
    Audio.current.onended = (()=> {
      setRange(0);
      CurrentTime.current.innerHTML = '00:00';
      Duration.current.innerHTML = '00:00';
      next();
    });
    Audio.current.ontimeupdate = ((e)=> {
      updateTime(e);
    });
  }, [ range, index]);

  useEffect(()=> {
    Audio.current.src = musics[index]?.music;
    Audio.current.play();
  }, [index]);
  return (
    <>
    <Head>
        <title>Music List</title>
      </Head>
    <div className={styles.main}>
        <h1>Music Player</h1>
        <input value={volume} onChange={e=> {
      setVolume(e.target.value);
      Audio.current.volume = e.target.value;
    }} className={styles.valueScrall} type="range" ref={val} max="1" step=".1" min="0.1" />
        <ul className={styles.ul}>
        {musics.map((m,i)=>(
        <li key={i} onClick={e=>setIndex(i)} className={`${styles.li} ${index==i?styles.playing:''}`}>
            <div className={styles.contenar}>
              <div className={styles.imgBx}>
                <Image layout="fill" src={m.image} alt="img" id="img" />
        </div>
              <div className={styles.descriptions}>
                <h2 className={styles.title}>{m.name}</h2>
                <h3 className={styles.artist}>admin</h3>
        </div>
        </div>
          </li>
      ))}
    </ul>
        <audio ref={Audio} src={musics[index]?.music}></audio>
        <div className={styles.controllerDiv}>
          <div className={styles.timer}>
            <span ref={CurrentTime}>00:00</span>
            <span ref={Duration}>00:00</span>
      </div>
          <div className={styles.progressDiv}>
            <input value={range} ref={progressBar} onChange={e=>Range(e)} className={styles.progressBar} type="range" min="0" max="100" step="1" />
      </div>
          <div className={styles.controller}>
            <svg onClick={_=>prev()} width="24" height="24" viewBox="0 0 24 24">
              <path d="M6,6H8V18H6M9.5,12L18,18V6M16,14.14L12.97,12L16,9.86V14.14Z" />
            </svg>
            <svg onClick={_=>playPouse()} width="24" height="24" viewBox="0 0 24 24">
          <path d="M8.5,8.64L13.77,12L8.5,15.36V8.64M6.5,5V19L17.5,12" />
          <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
            <svg onClick={_=>next()} width="24" height="24" viewBox="0 0 24 24">
              <path d="M6,18L14.5,12L6,6M8,9.86L11.03,12L8,14.14M16,6H18V18H16" />
            </svg>
            <svg onClick={_=>Volume()} width="24" height="24" viewBox="0 0 24 24">
              <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
            </svg>
      </div>
    </div>
    </div> </>
  );
}