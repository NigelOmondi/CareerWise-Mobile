import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-expo";
import { getUserEnrolledCourse } from '@/Services/cms';

const EnrolledCoursesContext = createContext<any>(null);

export const EnrolledCoursesProvider = ({ children }: { children: React.ReactNode }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const { user } = useUser();

  const fetchEnrolledCourses = async (courseId: string) => {
    try {
      if (user) {
        const data = await getUserEnrolledCourse(courseId, user?.primaryEmailAddress?.emailAddress);
        setEnrolledCourses(data.userEnrolledCourses);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  return (
    <EnrolledCoursesContext.Provider value={{ enrolledCourses, fetchEnrolledCourses }}>
      {children}
    </EnrolledCoursesContext.Provider>
  );
};

export const useEnrolledCourses = () => {
  return useContext(EnrolledCoursesContext);
};
