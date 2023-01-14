import { useAuthContext } from '../../../hooks';
import { FirstProfileSection, SecondProfileSection, ThirdProfileSection } from '../../components';

export const UserProfilePage = () => {
    const { user } = useAuthContext()

    return (
        <div className="container">
            <FirstProfileSection user={ user } isMine />
            <SecondProfileSection />
            <ThirdProfileSection isMine />
        </div>
    )
}