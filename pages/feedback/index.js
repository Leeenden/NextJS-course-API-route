import { Fragment, useState } from "react"
import { buildFeedbackPath, extractFeedback } from "../api/feedback"

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState()

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback)
      })
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

// never use FETCH inside getStaticProps || GetServerSideProps to a file INSIDE
// your project. Instead write any node.js logic inside this function

export async function getStaticProps() {
  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)
  return {
    props: {
      feedbackItems: data,
    },
  }
}

export default FeedbackPage
