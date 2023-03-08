import { buildFeedbackPath, extractFeedback } from "../api/feedback"

function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
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
