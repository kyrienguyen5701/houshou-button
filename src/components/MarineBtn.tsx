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
import axios from "axios";

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
    const [isDisabled, setIsDisabled] = useState(false);
    // const [media, setMedia] = useState('');
    const dispatch = useDispatch();
    const video = useSelector((state: any) => (state.video));
    const random = useSelector((state: any) => (state.random));
    const randomCtg = useSelector((state: any) => (state.randomCtg));

    const getMedia = async () => {
        let url;
        if (props.data.category !== 4) url = props.data.file;
        else {
            await axios({
                method: 'POST',
                url: '/send',
                headers: {'content-type': 'application/json'},
                data: {
                    'url': props.data.url,
                    'isMobile': isMobile() 
                }
            })
            .then(resolve => url = resolve.data)
            .catch(e => console.log(e))
        }
        return url;
    }

    async function playBtn() {
        setIsPlaying(true);
        if (video) {
            if (!getConfig().overlap) {
                dispatch(toggleVideo(''));
                props.setImageIndex();
            }
        }
        let media = '';
        await getMedia().then(resolve =>  media = String(resolve))
        let ctrl;
        if (props.data.category !== 4) {
            ctrl = soundCtrl.play({
                isPlaying: true,
                isDisabled: false,
            }, new Audio(require('../assets/sounds/' + media).default),
                setIsPlaying);
        }
        else {
            ctrl = soundCtrl.play({
                isPlaying: true,
                isDisabled: false,
            }, new Audio(media),
                setIsPlaying);
        }
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
            };
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
            disabled={isDisabled}
            onClick={playBtn}
        >
            {getLang(props.data.name)}
        </button>
    )
}

export default MarineBtn;
