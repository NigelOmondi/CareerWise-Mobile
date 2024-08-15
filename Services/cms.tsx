import { gql, request } from "graphql-request";
import { ToastAndroid } from "react-native";

const MASTER_URL = `${process.env.EXPO_PUBLIC_MASTER_URL}`;

export const getCourseList = async (level: string | undefined) => {
  const query =
    gql`
    query CourseList {
      courses (where: {level: ` +
    level +
    `}) {
        id
    name
    price
    level
    tags
    time
    author
    description {
      markdown
    }
    banner {
      url
    }
    chapters {
      id
      title
      content {
        id
        heading
        description {
          markdown
          html
        }
        output {
          markdown
          html
        }
      }
    }
  }
    }
  `;

  const data: any = await request(MASTER_URL, query);

  return data.courses;
};

export const enrollCourse = async (
  courseId: string,
  userEmail: string | undefined
) => {
  const mutationQuery =
    gql`
  mutation MyMutation {
  createUserEnrolledCourse(
    data: {courseId: "` +
    courseId +
    `", userEmail: "` +
    userEmail +
    `", course: {connect: {id: "` +
    courseId +
    `"}}}
  ) {
    id
  }
  publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
    edges {
      node {
        id
      }
    }
  }
}`;

  try {
    const data: any = await request(MASTER_URL, mutationQuery);
    //console.log('Raw response:', data);
    return data;
  } catch (error) {
    console.error("Error enrolling course:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getUserEnrolledCourse = async (
  courseId: string,
  userEmail: string | undefined
) => {
  const query =
    gql`
  query GetUserEnrolledCourses {
  userEnrolledCourses(
    where: {courseId: "` +
    courseId +
    `", userEmail: "` +
    userEmail +
    `"}
  ) {
    id
    courseId
    completedChapter {
      chapterId
    }
  }
}`;

  try {
    const data: any = await request(MASTER_URL, query);
    //console.log('Raw response from enrolled courses:', data);
    return data;
  } catch (error) {
    console.error("Error getting enrolled courses:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const markCompletedChapter = async (
  chapterId: string,
  recordId: string,
  email: string | undefined,
  totalPoints: number
) => {
  const mutationQuery =
    gql`
  mutation MarkCompletedChapter  {
  updateUserEnrolledCourse(
    data: {completedChapter: {create: {data: {chapterId: "` +
    chapterId +
    `"}}}}
    where: {id: "` +
    recordId +
    `"}
  ) {
    id
  }

  publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
    edges {
      node {
        id
      }
    }
  }

  updateUserDetail(where: {email: "` +
    email +
    `"}, data: {point: ` +
    totalPoints +
    `}) {
    point
  }
  publishUserDetail(where: {email: "` +
    email +
    `"}) {
    id
  }
}
  `;
  try {
    const data: any = await request(MASTER_URL, mutationQuery);
    console.log('Raw API response from completed chapter:', data);
    return data;
  } catch (error) {
   
    //console.error("API  Error on completed chapter:", error);
    //throw error; // Re-throw the error after logging it
    return null
  }
};

export const createNewUser = (
  userName: string | null,
  email: string,
  point: number,
  profileImageUrl: string
) => {
  const mutationQuery =
    gql`
  mutation CreateNewUser {
    upsertUserDetail(
      upsert: {create: {email: "` +
    email +
    `", point: ` +
    point +
    `, profileImage: "` +
    profileImageUrl +
    `", userName: "` +
    userName +
    `"}, 
      update: {point: ` +
    point +
    `, profileImage: "` +
    profileImageUrl +
    `", userName: "` +
    userName +
    `", email: "` +
    email +
    `"}}
      where: {email: "` +
    email +
    `"}
    ) {
      id
      point
    }
    publishUserDetail(where: {email: "` +
    email +
    `"}) {
      id
    }
  }`;

  try {
    const data: any = request(MASTER_URL, mutationQuery);
    //console.log('Raw API response from creating user', data);
    return data;
  } catch (error) {
    console.error("API Error on creating user:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getUserDetail = async (email: string | undefined) => {
  const query =
    gql`
    query getUserDetails {
      userDetail(where: {email: "` +
    email +
    `"}) {
        point
      }
  }`;

  try {
    const data: any = await request(MASTER_URL, query);
    //console.log("Raw API response from getting user points:", data);
    return data; //returns 10 for now
  } catch (error) {
    console.error("API Error on getting user points:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getAllUsers = async () => {
  const query = gql`
    query GetAllUsers {
      userDetails(orderBy: point_DESC) {
        id
        profileImage
        userName
        point
      }
    }
  `;

  try {
    const data: any = await request(MASTER_URL, query);
    //console.log('Raw API response from getting all users:', data);
    return data;
  } catch (error) {
    console.error("API Error on getting all users:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getAllUserEnrolledCoursesProgress = async (
  email: string | undefined
) => {
  const query =
    gql`
    query GetAllUserEnrolledCoursesProgress {
  userEnrolledCourses(where: {userEmail: "`+email+`"}) {
    completedChapter {
      chapterId
    }
    course {
      banner {
        url
      }
      chapters {
        id
        title
        content {
          heading
          description {
            markdown
            html
          }
          output {
            markdown
            html
          }
        }
      }
      description {
        markdown
      }
      id
      level
      name
      price
      time
    }
  }
}
  `;
  try {
    const data: any = await request(MASTER_URL, query);
    //console.log('Raw API response from getting user courses progress:', data);
    return data;
  } catch (error) {
    console.error("API Error on getting users courses progress:", error);
    throw error; // Re-throw the error after logging it
  }
};
