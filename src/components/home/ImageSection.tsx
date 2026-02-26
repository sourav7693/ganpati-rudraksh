import Image from 'next/image'

export default function ImageSection() {
  const images = [
    '/images/home1.png',
    '/images/rudrakshGold.png',
    '/images/rudrakshrasoria.png',
    
  ]

  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-300 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative h-[180px] sm:h-[220px] lg:h-[260px] overflow-hidden rounded"
            >
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                fill
                className="object-container"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
