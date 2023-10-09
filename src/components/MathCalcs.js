const EARTH_RADIUS = 6371;

function Deg2Rad(v)
{
  return v / 180.0 * Math.PI;
}

export function GetOrthoDist (StartLon, StartLat,DestLon,DestLat , Precision)
{
  let lon1 = -Deg2Rad(StartLon);
  let lon2 = -Deg2Rad(DestLon);
  let lat1 = Deg2Rad(StartLat);
  let lat2 = Deg2Rad(DestLat);

  if (typeof Precision == "undefined" || typeof Precision != "number")
  {
    Precision = 10;
  }
  //        d=2*asin(sqrt((sin((lat1-lat2)/2))^2 + 
  //                 cos(lat1)*cos(lat2)*(sin((lon1-lon2)/2))^2))

  let retval = 2 * Math.asin(Math.sqrt(Math.pow((Math.sin((lat1 - lat2) / 2)), 2) +
    Math.pow(Math.cos(lat1) * Math.cos(lat2) * (Math.sin((lon1 - lon2) / 2)), 2)));

  return RoundPow(EARTH_RADIUS * retval, Precision);
};

var PowLut=[];
export function RoundPow(v, P)
{
  if (typeof P !== 'undefined')
  {
    if (!PowLut[P])
    {
      PowLut[P]=Math.pow(10, P);
      console.log(PowLut)
    }
    let Div = PowLut[P];
    return Math.round(v * Div) / Div;
  }
  else
  {
    return v;
  }
}