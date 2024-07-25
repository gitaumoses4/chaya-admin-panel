import React from 'react';
import { motion } from 'framer-motion';
import bg from '../../assets/game_bg.png';
import clouds from '../../assets/game_clouds.png';

export const Background = (props) => {
  return (
    <div className="w-full h-full left-0 right-0 absolute">
      <motion.div className="w-[3000px] h-full absolute">
        <motion.img className="w-full h-full absolute left-0 top-0 object-fill" src={bg}></motion.img>
      </motion.div>
      <motion.div
        style={{ background: `url(${clouds})`, backgroundSize: 'cover' }}
        className="w-full absolute h-40 top-10"
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 10, repeat: Infinity }}
      ></motion.div>
    </div>
  );
};
