import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import FeedbackItem from "./FeedbackItem"

function FeedbackList({ feedback, handleDelete }) {
    if (!feedback || feedback.length === 0) return 'No Feedback yet!'

    return (
        <div className='feedback-list'>
            <AnimatePresence>
                {feedback.map(item => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <FeedbackItem key={item.id} item={item} onDelete={handleDelete} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )

    // return (
    //     <div className='feedback-list'>
    //         {feedback.map(item => (
    //             <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
    //         ))}
    //     </div>
    // )
}

// eslint-disable-next-line no-unused-expressions
FeedbackList.propTypes = {
    feedback: PropTypes.array.isRequired,
}

export default FeedbackList
