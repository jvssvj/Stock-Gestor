export default function NavItem({ imageElement, name, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 cursor-pointer text-base bg-transparent w-full text-text-muted p-2 rounded-lg transition-all duration-200 ease-in-out font-medium z-[2] hover:bg-primary-light hover:text-primary ${isActive ? 'text-primary bg-primary-subtle' : ''}`}
    >
      <span className="leading-[0]">{imageElement}</span>
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">{name}</span>
    </button>
  );
}