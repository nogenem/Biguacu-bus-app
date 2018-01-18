export const fetchRoutes = company =>
  fetch("http://www.biguacutransportes.com.br/ajax/lineBus/searchGetLine", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `order=DESC&company=${company}`
  });

export const fetchRoute = cod =>
  fetch(
    `http://www.biguacutransportes.com.br/ajax/lineBus/preview/?line=${cod}&detail[]=1,2,3`
  );
