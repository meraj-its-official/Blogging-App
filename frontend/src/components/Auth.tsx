import type { SignupInput } from "@meraj_its_official/blog-common";
import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router"
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInput);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('token', response.data.jwt)
            navigate("/")
        } catch (e: any) {
            console.error("Signin failed:", e.response?.data);
            alert(e.response?.data?.message || "Invalid credentials or access denied.");
        }
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="rounded-2xl border border-gray-300 pl-12 pr-12 pt-10 pb-6 overflow-hidden">
                <form onSubmit={sendRequest} >
                    <div className="flex items-center flex-col px-8">
                        <div className="text-4xl font-extrabold">
                            {type === "signin" ? "Welcome Back" : " Create a New Account"}
                        </div>
                        <div className="text-slate-400">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign Up" : "Sign In"}</Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === "signup" ? <LabelledInput label="Name" placeholder="Jhon..." onChange={(e) => {
                            setPostInput({
                                ...postInput,
                                name: e.target.value
                            })
                        }} /> : null}
                        <LabelledInput label="Email" placeholder="abc@gmail.com" onChange={(e) => {
                            setPostInput({
                                ...postInput,
                                email: e.target.value
                            })
                        }} />
                        <LabelledInput label="Password" type={"password"} placeholder="Abc123@" onChange={(e) => {
                            setPostInput({
                                ...postInput,
                                password: e.target.value
                            })
                        }} />
                        <button onClick={sendRequest} type="button" className=" mt-4 w-full text-white bg-slate-800 box-border border border-transparent 
                   hover:bg-slate-950 cursor-pointer focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-bold leading-5 
                   rounded-2xl text-md py-4 focus:outline-none">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                    </div>
                </form>
            </div>
        </div>
    </div >
}


interface LabelledInputType {
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}


function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2.5 text-sm font-bold text-heading">{label}</label>
        <input onChange={onChange} type={type || "text"} className="bg-neutral-secondary-medium border border-default-medium 
        text-heading text-md focus:ring-brand rounded-2xl bg-slate-100 focus:border-brand block w-full 
        px-3 py-2.5 mb-5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
    </div >
}