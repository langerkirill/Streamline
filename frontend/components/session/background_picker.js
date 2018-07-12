export const bpicker = () => {
  const bgrounds = {
    0: '/assets/mb.jpg',
    1: '/assets/bi.jpeg',
    2: '/assets/br.jpeg',
    3: '/assets/gal.jpeg',
    4: '/assets/gb.jpeg',
    5: '/assets/go.jpeg',
    6: '/assets/mbf.jpeg',
    7: '/assets/mbg.jpeg',
    8: '/assets/bb.jpeg',
    9: '/assets/bgb.jpeg',
    10: '/assets/tbg.jpeg',
    11: '/assets/gob.jpeg'
  }

  let key = Math.floor(Math.random()*12);
  return bgrounds[key]
}
