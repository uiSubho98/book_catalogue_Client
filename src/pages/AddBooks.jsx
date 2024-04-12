import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useAddBooksMutation } from "../Redux/features/BooksSlice";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

  // State variables for form fields
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(0);
  const [publishedDate, setPublishedDate] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [updateTask] = useAddBooksMutation();

  // Function to handle changes in input fields
  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  // Function to handle thumbnail file upload
  const handleThumbnailChange = (file) => {
    setThumbnail(file);
  };
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("price", price);
    formData.append("pub_date", publishedDate);
    formData.append("poster", thumbnail);
    try {
        const response = await updateTask(formData);
        console.log(response);
      if (response?.data?.statusCode === 200) {
        // console.log("Successfully added!");
        navigate("/allBooks");
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-[100%] h-fit mt-24">
        <div className="col-span-2 py-14 lg:px-10 px-8 border-2 border-white bg-black">
          <h2 className="text-3xl text-white font-medium">Add Your Book</h2>
          <div className="grid md:grid-cols-2 grid-col-1 gap-4">
            <div className="flex flex-col py-4">
              <label
                htmlFor="Title"
                className="text-base text-white mb-2 font-medium"
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleInputChange(e, setTitle)}
                className="outline-none border-b-2 border-solid focus:border-red-400 transition-all"
              />
            </div>
            <div className="flex flex-col py-4">
              <label
                htmlFor="Genre"
                className="text-base text-white mb-2 font-medium"
              >
                Genre
              </label>
              <input
                type="text"
                value={genre}
                onChange={(e) => handleInputChange(e, setGenre)}
                className="outline-none border-b-2 border-solid focus:border-red-400 transition-all"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-col-1 gap-4">
            <div className="flex flex-col py-4">
              <label
                htmlFor="Price"
                className="text-base text-white mb-2 font-medium"
              >
                Price
              </label>
              <input
                type="number"
                min={0}
                max={5000}
                value={price}
                onChange={(e) => handleInputChange(e, setPrice)}
                className="outline-none border-b-2 border-solid focus:border-red-400 transition-all"
              />
            </div>
            <div className="flex flex-col py-4">
              <label
                htmlFor="Genre"
                className="text-base font-medium text-white mb-2"
              >
                Published Date
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                value={publishedDate}
                onChange={(e) => handleInputChange(e, setPublishedDate)}
                className="outline-none border-b-2 border-solid focus:border-red-400 transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col py-4 pb-8">
            <label
              htmlFor="poster"
              className="text-base font-medium text-white mb-2"
            >
              Thumbnail
            </label>
            <FileUploader
              multiple={false}
              handleChange={handleThumbnailChange}
              name="thumbnail"
              types={fileTypes}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-lg px-4 py-2 bg-black text-gray-100 border-2 border-white"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
