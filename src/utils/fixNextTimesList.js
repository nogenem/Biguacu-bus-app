const fixNextTimesList = (list, cHour) => {
  let ret = list;
  let index = -1;

  // Encontra o 1* horário a frente de cHour
  for (let i = 0; i < list.length; i++) {
    if (cHour < list[i].hora) {
      index = i;
      break;
    }
  }
  // Passa os horários atrás de cHour para o final da lista
  if (index >= 0)
    ret = [...ret.slice(index, list.length), ...ret.slice(0, index)];
  return ret;
};

export default fixNextTimesList;
