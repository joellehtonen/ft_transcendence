import { useState, createContext, useContext, useRef, ReactNode, useEffect } from 'react';
import { UserContextType, User } from '../utils/Interfaces';
import { DEFAULT_AVATAR } from '../utils/constants';
import API_BASE from "../utils/config";


export const userContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(userContext);
    if (!context)
        throw new Error('Invalid use of userContext');
    return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
	const [refreshDone, setRefreshDone] = useState(false);
	const [tokenReceived, setTokenReceived] = useState(false);

    const refresh = async () => {
        try {
            const response = await fetch(`${API_BASE}/as/auth/refresh`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok)
            {
				setRefreshDone(true);
                setUser(null);
                return null;
            }

            const data = await response.json();
            const newExpiration = Date.now() + 15 * 60 * 1000;

			setRefreshDone(true);
			setTokenReceived(true);

			setUser({
                username: data.user.username,
				id: data.user.id,
				profilePic: data.user.avatarUrl,
				score: 0,
				rank: 0,
				rivals: [],
                expiry: newExpiration,
                accessToken: data.accessToken,
				twoFA: data.user.twoFA,
				googleUser: data.user.googleUser,
            });

			// fetch for user stats
			const statResponse = await fetch (`${API_BASE}/stats/user_match_data/`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			
			if (!statResponse.ok) {
				setUser(null);
				setRefreshDone(true);
                return null;
			}
			
			const stats = await statResponse.json();

			// fetch for user rivals
			const rivalResponse = await fetch (`${API_BASE}/stats/rivals/${data.user.id}`, {
				method: 'GET',
				headers: {
				'Content-Type': 'application/json',
				},
			});
		
			if (!rivalResponse.ok) {
				setUser(null);
				setRefreshDone(true);
                return null;
			}
			
			const rivals = await rivalResponse.json();

            setUser({
                username: data.user.username,
				id: data.user.id,
				profilePic: data.user.avatarUrl || DEFAULT_AVATAR,
				score: stats.score,
				rank: stats.rank,
				rivals: rivals,
                expiry: newExpiration,
                accessToken: data.accessToken,
				twoFA: data.user.twoFA,
				googleUser: data.user.googleUser,
            });

            return data.accessToken;
		}
        catch {
            setUser(null);
			setRefreshDone(true);
            return null;
        }
    };

	const logOut = async () => {
		try {
			const response = await fetch(`${API_BASE}/as/auth/logout`, {
				method: 'POST',
				credentials: 'include'
			});

			if (!response.ok)
				throw new Error(`HTTP error! Status: ${response.status}`);
		}
		catch(error) {
			console.log('Log out failed: ', error);
		}
		finally {
			setUser(null);
			setRefreshDone(true);
			setTokenReceived(false);
		}
	}

	useEffect(() => {
		refresh();
	}, []);

    return (
        <userContext.Provider value={{ user, setUser, refresh, logOut, tokenReceived, refreshDone, setTokenReceived }}>
            {children}
        </userContext.Provider>
    )
};
