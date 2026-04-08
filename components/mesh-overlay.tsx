export default function MeshOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(#ffffff0d 1px, transparent 1px), linear-gradient(90deg, #ffffff0d 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}
