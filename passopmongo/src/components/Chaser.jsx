import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Chaser = () => {
    const ref = useRef()

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const getPasswords= async() => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        
            setPasswordArray(passwords)
        

    }
    
    useEffect(() => {
        getPasswords()
    }
        , [])
    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)

    }


    const showpassword = () => {
        alert('show the password');

    }
    const savepassword = async() => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({id:form.id})})
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            
            await fetch("http://localhost:3000/",{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
        toast('Password Saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        }
        else{
            toast('Error:Password not saved');
        }
        
        
    }
    const deletePassword = async (id) => {
        console.log("deleting password with id", id)
        let c = confirm("Do u want to delete this password? ")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            let res= await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({id})})
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
    
            });
        }

    }
    const editPassword = (id) => {
        
        console.log("editing password with id", id)
        setform({...passwordArray.filter(i => i.id === id)[0],id:id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="p-3  md:mycontainer min-h-[88.2vh]">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-700'> &lt; </span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id='site' />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter userName' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id='username' />
                        <div className="relative">
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer ' onClick={showpassword}>
                                Show
                            </span>
                        </div>
                    </div>


                    <button onClick={savepassword} className='flex justify-center items-center rounded-full  bg-green-600 hover:bg-green-500 gap-2 border border-green-900 px-5 py-1 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md mb-1 ">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' py-2 border border-white text-center '><div className='flex items-center justify-center'><a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer ' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon></div></div>
                                        </td>
                                        <td className='justify-center py-2 border border-white text-center w-32'><div className='flex items-center justify-center'><span>{item.username} </span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon></div></div>
                                        </td>
                                        <td className='items-center justify-center py-2 border border-white text-center '><div className='flex items-center justify-center'><span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon></div></div>
                                        </td>
                                        <td className='items-center justify-center py-2 border border-white text-center '>
                                            <span className='cursor-pointer  mx-2' onClick={() => { editPassword(item.id) }}> <lord-icon
                                                src="https://cdn.lordicon.com/qnpnzlkk.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                            </span>

                                            <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}> <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div >
        </>
    )
}

export default Chaser