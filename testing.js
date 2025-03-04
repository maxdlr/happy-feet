let points = [[], [], [], []];
let inTangents = [[0,0], [0,0], [0,0], [0,0]];
let outTangents = [[0,0], [0,0], [0,0], [0,0]];

const bendLeader = thisComp.layer("Null 10").transform.position;

const firstArticulation = thisComp.layer("Foot").content("Articulations").content("Ankle");
const secondArticulation = thisComp.layer("Foot").content("Articulations").content("Bunion");

const firstArticulationPos = firstArticulation.transform.position;
const firstArticulationRadius = firstArticulation.content("Ankle - Ellipse").size[0]/2;
const secondArticulationPos = secondArticulation.transform.position;
const secondArticulationRadius = secondArticulation.content("Bunion - Ellipse").size[0]/2;

// Calculate the tangent point coordinates
function getPerpendicularPoint(centerPos, radius, referencePos, angleOffset) {
  const dx = referencePos[0] - centerPos[0];
  const dy = referencePos[1] - centerPos[1];
  const phi = Math.atan2(dy, dx);
  const angle = phi - angleOffset;

  return [
    centerPos[0] + radius * Math.cos(angle),
    centerPos[1] + radius * Math.sin(angle)
  ];
}

// Calculate the four points (two from each circle)
// Using 90 degree (Math.PI/2) perpendicular points as you specified
const onePoint = getPerpendicularPoint(firstArticulationPos, firstArticulationRadius, secondArticulationPos, Math.PI/2);
const twoPoint = getPerpendicularPoint(firstArticulationPos, firstArticulationRadius, secondArticulationPos, -Math.PI/2);
const fourPoint = getPerpendicularPoint(secondArticulationPos, secondArticulationRadius, firstArticulationPos, -Math.PI/2);
const threePoint = getPerpendicularPoint(secondArticulationPos, secondArticulationRadius, firstArticulationPos, Math.PI/2);

points = [onePoint, twoPoint, threePoint, fourPoint]
inTangents[0] = bendLeader - points[0];

createPath(points, inTangents, outTangents, true)