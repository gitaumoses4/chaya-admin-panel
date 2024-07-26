import React from 'react';
import clouds from '../../assets/game_clouds.png';
import { motion } from 'framer-motion';

export const Clouds = (props) => {
  return (
    <motion.div
      style={{ background: `url(${clouds})`, backgroundSize: 'cover' }}
      className="w-full absolute h-40 top-10"
      animate={{ x: [-10, 10, -10] }}
      transition={{ duration: 10, repeat: Infinity }}
    ></motion.div>
  );
};
