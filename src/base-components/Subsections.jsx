import { useState } from 'react';
import '../common-static/css/subsections-common.css'

import Link from './link';

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from 'framer-motion';

const Subsection = ({links}) => {

    const [isConcealed, setConcealed] = useState(false)

    return (
        <div>
            <AnimatePresence exitBeforeEnter>
                {
                    isConcealed && (
                        <div
                            onClick={() => setConcealed(!isConcealed)}
                            className='subsections__conceal'>
                            <motion.div
                                key='hamburger'
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className='admin__conceal_wrapper'>
                                <RxHamburgerMenu
                                    className='subsections__burger' />
                            </motion.div>

                        </div>
                    )
                }

                {
                    !isConcealed && (
                        <div
                            onClick={() => setConcealed(!isConcealed)}
                            className='subsections__conceal'>
                            <motion.div
                                key='cross'
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className='admin__conceal_wrapper'>
                                <RxCross2
                                    className='subsections__burger' />
                            </motion.div>

                        </div>
                    )
                }
            </AnimatePresence>

            <div className='subsections'>
                <AnimatePresence>
                    {
                        !isConcealed && (
                            <motion.div
                                initial={{ x: -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: 'spring', duration: 0.7, ease: 'easeIn' }}
                                exit={{ x: -300, opacity: 0 }}
                                key='slide'
                                style={{ overflow: 'hidden' }}
                                className='subsections__links'>
                                {links.map((el, index) => {
                                    return <Link
                                        key={index}
                                        index={index}
                                        link={el.link}
                                        title={el.title} />
                                })}
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </div>

    )
}

export default Subsection