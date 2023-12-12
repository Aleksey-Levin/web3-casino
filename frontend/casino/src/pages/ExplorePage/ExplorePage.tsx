import { observer } from 'mobx-react-lite'
import { styled } from '@stitches/react'

import { AppLayout } from '../../components/App'

const StyledExplorePageContainer = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    padding: '32px 0',
    gap: '32px',
})

export const ExplorePage = observer(() => {
    return (
        <AppLayout>
            <h1>aoeuoaeu</h1>
        </AppLayout>
    )
})