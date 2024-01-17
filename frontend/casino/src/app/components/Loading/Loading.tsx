import LoadingImg from '../../../assets/LoadingScreen.gif'
import { styled } from '../../../styles'

const LoadingStyle = styled('div', {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

const Loading = () => {
    return (
        <LoadingStyle>
            <img style={{ width: '100vw' }} src={LoadingImg} />
        </LoadingStyle>
    )
}

export default Loading
