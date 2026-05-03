// eslint-disable-next-line no-unused-vars
export default function Card({ icon: Icon, title, paragraph, bgColor, iconColor }) {
  return (
    <div className="w-full bg-white py-8 px-4 rounded-lg">
      <div
        style={{ backgroundColor: bgColor }}
        className="flex items-center justify-center w-[50px] h-[50px] rounded-full"
      >
        <Icon color={iconColor} />
      </div>

      <h3 className="my-4 text-text-main text-2xl max-[420px]:text-xl">{title}</h3>
      <p className="text-text-muted leading-7">{paragraph}</p>
    </div>
  )
}
