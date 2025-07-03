import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const useImageRender = () => {

    const [imgUrl, setImgUrl] = useState("");
    const toast = useToast();

    const getFilesToRead = (e) => {
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")) {
            // valid file
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setImgUrl(reader.result);
            }
        } 
        else {
            // invalid file
            toast({
                title: "Invalid File Type",
                description: "File Type must be an image",
                status: "error",
                isClosable: true,
                duration: 3000
            });

            setImgUrl(null);
        }
    }  
    
  return {getFilesToRead, imgUrl, setImgUrl}
}

export default useImageRender;