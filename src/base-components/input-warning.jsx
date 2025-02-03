
import { motion } from "framer-motion"

export const InputWarning = ({ text }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ overflow: 'hidden' }}
            className='subsection__warn'>
            {text}
        </motion.div>
    )
}