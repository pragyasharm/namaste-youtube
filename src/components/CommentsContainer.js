

const commentsData = [{
    name: "Pragya Sharma",
    text: "First comment",
    replies: []
},
{
    name: "Pragya Sharma",
    text: "Lorem lipsum",
    replies: [
        {
            name: "Pragya Sharma",
            text: "Lorem lipsum",
            replies: [{
                name: "Pragya Sharma",
                text: "Lorem lipsum",
                replies: [{
                    name: "Pragya Sharma",
                    text: "Lorem lipsum",
                    replies: [{
                        name: "Pragya Sharma",
                        text: "Lorem lipsum",
                        replies: [{
                            name: "Pragya Sharma",
                            text: "Lorem lipsum",
                            replies: []
                        }]
                    }]
                }]
            }]
        }
    ]
}
]

const Comment = ({ data }) => {
    const { name, text, replies } = data;
    return (<div className="flex shadow-sm rounded-lg bg-gray-100 m-1">
        <img className="w-12 h-12" alt="user icon" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
        <div className="px-3">
            <p className="font-bold">{name}</p>
            <p>{text}</p>
        </div>
    </div>

    );
}

const CommentList = ({ comments }) => {
    return comments.map((comment, index) => (
        // Disclaimer : don;t use indexes as keys
        <div key={index} >
            <Comment data={comment} />
            <div className="pl-5 border border-l-black ml-5">
                <CommentList comments={comment.replies}/>
            </div>
        </div>)
    )
}
const CommentsContainer = () => {
    return (
        <div className="m-5 p-2">
            <h1 className="font-bold">Comments:</h1>
            <CommentList comments={commentsData} />
        </div>
    )
}

export default CommentsContainer