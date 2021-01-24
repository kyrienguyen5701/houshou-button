import {useState} from 'react';
import categoryNames from '../assets/categories.json';
// @ts-ignore
import {useSelector, useDispatch} from 'react-redux';
import {getLang} from '../utils/lang';
import {soundCtrl} from '../utils/player';
import {toggleVideo} from '../redux/reducer';
import MarineBtnData from '../utils/data';
import {getConfig} from '../utils/storage';
import './MarineBtn.scss';
import isMobile from "../utils/device";
import axios from 'axios';

export interface MarineBtnState {
    isPlaying: boolean,
    isDisabled: boolean,
}

const MarineBtn = (props: {
    data: MarineBtnData,
    setImageIndex: Function,
    onRandom: Function,
    onRandomCtg: Function
}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const dispatch = useDispatch();
    const video = useSelector((state: any) => (state.video));
    const random = useSelector((state: any) => (state.random));
    const randomCtg = useSelector((state: any) => (state.randomCtg));
    
    const getMedia = async () => {
        let media;
        if (props.data.category !== 4) media = props.data.file;
        else {
            await axios({
                method: 'POST',
                url: '/send', //'http://127.0.0.1:8000/send' for dev
                headers: {'content-type': 'application/json'},
                data: {
                    'url': props.data.url,
                    'isMobile': isMobile() 
                }
            })
            .then(res => media = res.data)
            .catch(e => console.log(e))
        }
        return media;
    }

    const playBtn = async () => {
        setIsPlaying(true);
        if (video) {
            if (!getConfig().overlap) {
                dispatch(toggleVideo(''));
                props.setImageIndex();
            }
        }
        const media = await getMedia().then(res => res);
        const ctrl = soundCtrl.play( {
            isPlaying: true,
            isDisabled: false,
        }, new Audio(props.data.category !== 4 
            ? require('../assets/sounds/' + media).default
            : media), setIsPlaying);
        if (props.data.category === 4 && !isMobile()) {
            dispatch(toggleVideo(media));
            ctrl.audio.volume = 0;
        }
        if (!getConfig().loop) {
            ctrl.audio.onended = () => {
                setIsPlaying(false);
                if ((!getConfig().overlap && !video) || props.data.category === 4) {
                    dispatch(toggleVideo(''));
                }
                if (random) {
                    props.onRandom();
                }
                if (randomCtg) {
                    props.onRandomCtg(randomCtg);
                }
            }
        }
        return ctrl;
    }

    return (
        <button
            className={`
                btn 
                MarineBtn 
                ${getLang((categoryNames as any)[props.data.category])} 
                ${isPlaying ? "playing" : ""}`
            }
            key={getLang(props.data.name)}
            onClick={playBtn}
        >
            {getLang(props.data.name)}
        </button>
    )
}

export default MarineBtn;
