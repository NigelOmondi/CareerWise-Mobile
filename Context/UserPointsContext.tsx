import { getUserDetail } from '@/Services/cms';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { getUserPoints } from '@/Services/storeUserPoints';

interface UserPointsContextType {
  points: number;
  setPoints: (value: number) => void;
}



export const UserPointsContext = createContext<UserPointsContextType | undefined>(undefined);

export const UserPointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  //GetUser();

  

  const [points, setPoints] = useState(0); // Set an initial value for 'points'
  
  // Declare 'res' variable
  //const res = response.userDetail.point;
  
  // Update 'res' value inside the getUserDetail callback
  // getUserDetail(user?.emailAddresses[0].emailAddress).then((response: any) => {
  //   //console.log("res on context.tsx", response);
  //   if (response) {
      
  //     setPoints(response.userDetail.point);
  //     //console.log('User Points returned from getUserDetail API on user points context.tsx:', response.userDetail.point);
  //     return response;
  //   }
  // });

  useEffect(() => {
    getUserPoints().then((res: any ) => {
      //console.log("Async Storage Response on context page", res);
      setPoints(res);
     
    });
  }, [points]);

  
  return (
    <UserPointsContext.Provider value={{ points, setPoints }}>
      {children}
    </UserPointsContext.Provider>
  );
};


