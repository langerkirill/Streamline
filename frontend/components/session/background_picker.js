export const bpicker = () => {
  const bgrounds = {
    0: window.mb,
    1: window.bi,
    2: window.br,
    3: window.gal,
    4: window.gb,
    5: window.go,
    6: window.mbf,
    7: window.mbg,
    8: window.bb,
    9: window.bgb,
    10: window.tbg,
    11: window.gob
  }

  let key = Math.floor(Math.random()*12);
  return bgrounds[key]
}

let back = bpicker();
