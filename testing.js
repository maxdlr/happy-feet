let points = [[], [], []];
let inTangents = [];
let outTangents = [];

const joints = ["Ankle", "Bunion"]

const group = thisComp.layer("Foot").content("articulations");
const firstArticulation = group.content(joints[0]);
const secondArticulation = group.content(joints[1]);

const firstArticulationPos = firstArticulation.transform.position;
const firstArticulationRadius = firstArticulation.content(joints[0] + " - Ellipse").size[0]/2;
const secondArticulationPos = secondArticulation.transform.position;
const secondArticulationRadius = secondArticulation.content(joints[1] + " - Ellipse").size[0]/2;

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

createPath(points, inTangents, outTangents, false)
