export const MakeBoidDrawer = (size: number) => {
  return (pos, vel, ctx) => {
    // Calculate the magnitude of the velocity vector
    const magnitude = Math.sqrt(vel[0] ** 2 + vel[1] ** 2);

    // Calculate the angle between the velocity vector and the x-axis
    const angle = Math.atan2(vel[1], vel[0]);

    const length = magnitude * 4;

    // Set the fill color to red
    ctx.fillStyle = "red";

    // Calculate the position of the vertices of the triangle based on the velocity vector
    const x1 = pos[0] + length * Math.cos(angle);
    const y1 = pos[1] + length * Math.sin(angle);
    const x2 = pos[0] + size * Math.cos(angle + (2 * Math.PI) / 3);
    const y2 = pos[1] + size * Math.sin(angle + (2 * Math.PI) / 3);
    const x3 = pos[0] + size * Math.cos(angle + (4 * Math.PI) / 3);
    const y3 = pos[1] + size * Math.sin(angle + (4 * Math.PI) / 3);

    // Begin drawing the triangle
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    // Fill the triangle with the current fill color
    ctx.fill();
  };
};
