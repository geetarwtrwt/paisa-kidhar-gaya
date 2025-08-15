"use client";
import { useState } from "react";
import axios from "axios";
import { FiUpload, FiTrash } from "react-icons/fi";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "@/app/UseAuth";

export default function MyAccountPage() {
  let { route, getUserData, getDashBoardData, toast } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["png", "jpg", "jpeg"].includes(ext)) {
      toast.error("Only JPG, JPEG, PNG files allowed");
      return;
    }
    setProfileImg(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleImageDelete = () => {
    setProfileImg(null);
    setImgPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { fullName, email, password } = formData;

      if (isLogin) {
        let res = await axios.post("/api/user/login", { email, password });
        if (res.data.success) {
          toast.success("Login Successful");
          setFormData({
            email: "",
            password: "",
          });
          await getUserData();
          await getDashBoardData();
          route.push("/");
        } else {
          toast.error(res.data.msg);
        }
      } else {
        if (!profileImg) return toast.error("Please upload profile image");

        let uploadForm = new FormData();
        uploadForm.append("file", profileImg);
        uploadForm.append("upload_preset", "my_unsigned_preset");
        uploadForm.append("cloud_name", "dgllhyxgc");

        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/dgllhyxgc/image/upload",
          {
            method: "POST",
            body: uploadForm,
          }
        );
        const data = await cloudinaryRes.json();
        if (!data?.secure_url) throw new Error("Image upload failed");

        const imageUrl = data.secure_url;

        let res = await axios.post("/api/user/signup", {
          fullName,
          email,
          password,
          profileImg: imageUrl,
        });
        if (res.data.success) {
          toast.success("Signup Successful");
          setIsLogin(!isLogin);
          setFormData({
            fullName: "",
            email: "",
            password: "",
          });
          setImgPreview(null);
          setProfileImg(null);
        } else {
          toast.error(res.data.msg);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4"
      style={{ background: "var(--bgGradient)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">
            {isLogin ? "Login to Account" : "Create New Account"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? "Welcome back!" : "Join us today."}
          </p>
        </div>

        {!isLogin && (
          <div className="flex flex-col items-center gap-2 mb-4">
            {imgPreview ? (
              <div className="w-20 h-20 relative overflow-hidden">
                <Image
                  src={imgPreview}
                  alt="Profile Preview"
                  width={80}
                  height={80}
                  className="w-[80px] h-[80px] object-cover rounded-full  border-2 border-primary"
                />
                <FiTrash
                  onClick={handleImageDelete}
                  className="absolute right-0 bottom-0 bg-red-500 text-white rounded-full text-3xl p-1"
                />
              </div>
            ) : (
              <label className="cursor-pointer text-gray-600  flex items-center gap-1 group">
                <FaRegUser className="w-[80px] h-[80px] object-cover text-6xl rounded-full group-hover:text-black  border-2 border-primary group-hover:border-black" />
                <FiUpload className="-translate-x-6 translate-y-4 p-1 bg-green-500 text-white rounded-full text-3xl" />
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        )}

        {!isLogin && (
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Signup"}
        </button>

        <p className="text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="text-blue-600 ml-1 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </form>
    </main>
  );
}
