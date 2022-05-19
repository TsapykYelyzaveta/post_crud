import {useCallback, useState} from "react";
import {addPostFx, editPostFx, replacePostFx} from "../store";
import Router from "next/router";

export default function AddEditForm({data = {}}) {
    const [post, setPost] = useState(data);

    const submitForm = useCallback((e) => {
        e.preventDefault();
        if(!post.id){
            addPostFx(post);
        }
        Router.push('/posts');
    }, [post]);

    return <form onSubmit={submitForm}>
        <label>User id
            <input type="number" value={post.userId} onChange={(e) =>
                setPost({...post, userId: e.target.value})}/>
        </label>
        <label>Title
            <input type="text" value={post.title} onChange={(e) =>
                setPost({...post, title: e.target.value})}/>
        </label>
        <label>Body
            <textarea value={post.body} onChange={(e) =>
                setPost({...post, body: e.target.value})}/>
        </label>
        {post.id ? <>
            <button onClick={() => {
                editPostFx(post);
            }
            }>Edit</button>
            <button onClick={() => {
                replacePostFx(post);
            }
            }>Replace</button>
        </> : <button type='submit'>Submit</button>}
    </form>
}