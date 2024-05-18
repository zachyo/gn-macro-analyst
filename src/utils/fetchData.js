import axios, { AxiosError } from "axios";
import { toast } from "sonner";


export async function fetchDataAxios(search) {
  const url =
    `https://gnews.io/api/v4/search?q=${'p'}&lang=en&country=us&max=40&apikey=` +
    process.env.REACT_APP_GNEWS_KEY;

  try {
    const response = await axios.get(url);
    // console.log("Email sent successfully. Response:", response.data);
    toast.success("Search is complete");
  } catch (error) {
    // console.log(error);
    // if (error?.code === "ERR_NETWORK") {
    toast.error("Error. Please try again!");
    // } else {
    //   toast.error(error.response.data.message);
    // }
    throw error;
  }
}
