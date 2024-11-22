import React, { useState } from 'react';
import axios from 'axios';

const Detector = () => {
    const [disabled, setdisabled] = useState(false);
    const [text, setText] = useState("");
    const [resp, setResp] = useState("");

    const detect = () => {
        axios.post("https://ai-content-detector-ai-gpt.p.rapidapi.com/api/detectText/",
            {
                "text": text,
            },
            {
                headers: {
                    'x-rapidapi-key': '2ce74f3844msh11023f99f55457ep1731eajsn6144224a5700',
                    'x-rapidapi-host': 'ai-content-detector-ai-gpt.p.rapidapi.com',
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                setResp(response.data);
                setdisabled(false)
            })
    }

    const handleDetect = () => {
        detect();
        setdisabled(true);
    }

    return (
        <div>
            <div className='w-3/4 mx-auto'>
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your message</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    id="message"
                    rows="10"
                    className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Write your thoughts here..."
                ></textarea>
            </div>
            {resp ? <div className='text-center bg-sky-300 w-1/2 mx-auto p-4 my-2 rounded-2xl text-blue-950 font-bold'>
                AI Words Count : {resp?.aiWords} &nbsp; &nbsp; Human : {resp?.isHuman} &nbsp;&nbsp; Fake Percentage : {resp?.fakePercentage}%
            </div> : null
            }
            <div className='text-center p-4'>
                <button
                    onClick={handleDetect}
                    className={`bg-sky-600 p-4 px-16 text-white text-lg rounded-full ${disabled ? "cursor-not-allowed " : null}`}
                    disabled={disabled}
                >{disabled ?
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-white fill-red-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    : "Detect"}</button>
            </div>
        </div>
    );
};

export default Detector;