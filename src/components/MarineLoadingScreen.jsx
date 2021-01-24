<<<<<<< HEAD
import './MarineLoadingScreen.scss'
import isMobile from "../utils/device";

const MarineLoadingScreen = () => {
    const loading = isMobile()
        ? require('../assets/loading/loadingPhone.gif').default
        : require('../assets/loading/loadingPC.gif').default
    const loader = isMobile()
        ? 'loader-phone'
        : 'loader-pc'
    return (
        <div className="loader-container">
            <img className={loader} loading="lazy" src={loading} alt={'Loading ...'} />
        </div>
    )
}

=======
import './MarineLoadingScreen.scss'
import isMobile from "../utils/device";

const MarineLoadingScreen = () => {
    const loading = isMobile()
        ? require('../assets/loading/loadingPhone.gif').default
        : require('../assets/loading/loadingPC.gif').default
    const loader = isMobile()
        ? 'loader-phone'
        : 'loader-pc'
    return (
        <div className="loader-container">
            <img className={loader} loading="lazy" src={loading} alt={'Loading ...'} />
        </div>
    )
}

>>>>>>> 958f8d57e0b3efae9c0cf9a8007fb9d77c0f4636
export default MarineLoadingScreen;