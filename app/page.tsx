"use client"

import Image from "next/image"
import {
  Phone,
  MessageCircle,
  Wrench,
  Shield,
  Clock,
  Users,
  Star,
  MapPin,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

import SimpleChatBot from "@/components/SimpleChatBot"

export default function FercoollLanding() {
  const whatsappNumber = "51945653427" // Número real configurado
  const phoneNumber = "51945653427" // Número real configurado

  const services = [
    {
      icon: <Wrench className="w-8 h-8 text-orange-500" />,
      title: "Instalación de aire acondicionado",
      description: "Instalación profesional de equipos de aire acondicionado para hogares y empresas",
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Mantenimiento preventivo y correctivo",
      description: "Mantenimiento regular para prolongar la vida útil de tu equipo",
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Recarga de gas refrigerante",
      description: "Recarga profesional con gases refrigerantes de alta calidad",
    },
    {
      icon: <Wrench className="w-8 h-8 text-orange-500" />,
      title: "Reparación de fallas",
      description: "Diagnóstico y reparación rápida de cualquier problema en tu equipo",
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Limpieza profunda",
      description: "Limpieza completa de filtros, serpentines y componentes internos",
    },
  ]

  const benefits = [
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      text: "Atención el mismo día",
    },
    {
      icon: <Shield className="w-6 h-6 text-orange-500" />,
      text: "Garantía por escrito",
    },
    {
      icon: <Wrench className="w-6 h-6 text-orange-500" />,
      text: "Repuestos originales",
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      text: "Servicio en hogares y empresas",
    },
  ]

  const testimonials = [
    {
      name: "María González",
      text: "Excelente servicio, muy rápidos y profesionales. Mi aire quedó como nuevo.",
      rating: 5,
    },
    {
      name: "Carlos Ramírez",
      text: "Llegaron el mismo día que llamé. Trabajo impecable y precio justo.",
      rating: 5,
    },
    {
      name: "Ana Vásquez",
      text: "Muy recomendados, solucionaron el problema que otros técnicos no pudieron.",
      rating: 5,
    },
  ]

  const WorkCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [imageLoadStates, setImageLoadStates] = useState<{[key: number]: 'loading' | 'loaded' | 'error'}>({})    
    const [isPlaying, setIsPlaying] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    const [progress, setProgress] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const progressRef = useRef<NodeJS.Timeout | null>(null)

    const workImages = [
      {
        src: "/ac-installation-1.jpg",
        title: "Instalación residencial",
        description: "Instalación de aire acondicionado split en sala de estar",
      },
      {
        src: "/ac-maintenance-1.jpg",
        title: "Mantenimiento preventivo",
        description: "Limpieza profunda de unidad condensadora",
      },
      {
        src: "/ac-maintenance-2.jpg",
        title: "Reparación de fallas",
        description: "Reparación de compresor en oficina comercial",
      },
      {
        src: "/ac-installation-2.jpg",
        title: "Instalación comercial",
        description: "Sistema de aire acondicionado para restaurante",
      },
      {
        src: "/ac-cleaning-1.jpg",
        title: "Limpieza de filtros",
        description: "Mantenimiento completo de sistema de climatización",
      },
    ]

    // Enhanced autoplay with progress tracking
    useEffect(() => {
      if (isPlaying && !isHovered) {
        setProgress(0)
        let progressCount = 0
        
        progressRef.current = setInterval(() => {
          progressCount += 1
          setProgress((progressCount / 40) * 100) // 4000ms / 100ms = 40 intervals
        }, 100)
        
        intervalRef.current = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % workImages.length)
          setProgress(0)
        }, 4000)
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (progressRef.current) clearInterval(progressRef.current)
      }
      
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (progressRef.current) clearInterval(progressRef.current)
      }
    }, [isPlaying, isHovered, workImages.length])

    // Function declarations - moved before useEffect to avoid initialization errors
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % workImages.length)
      setProgress(0)
    }

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + workImages.length) % workImages.length)
      setProgress(0)
    }

    const togglePlayPause = () => {
      setIsPlaying(!isPlaying)
    }

    const goToSlide = (index: number) => {
      setCurrentSlide(index)
      setProgress(0)
    }

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          prevSlide()
        } else if (e.key === 'ArrowRight') {
          nextSlide()
        } else if (e.key === ' ') {
          e.preventDefault()
          togglePlayPause()
        }
      }
      
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Touch gesture handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return
      
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > 50
      const isRightSwipe = distance < -50

      if (isLeftSwipe) {
        nextSlide()
      } else if (isRightSwipe) {
        prevSlide()
      }
    }

    return (
      <div 
        className="relative max-w-4xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Galería de trabajos realizados"
        tabIndex={0}
      >
        {/* Main carousel container */}
        <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl group">
          {workImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === currentSlide 
                  ? "opacity-100 scale-100 translate-x-0" 
                  : index < currentSlide 
                    ? "opacity-0 scale-105 -translate-x-full" 
                    : "opacity-0 scale-105 translate-x-full"
              }`}
            >
              <img 
                src={image.src || "/placeholder.svg"} 
                alt={image.title} 
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  index === currentSlide && isHovered ? 'scale-110' : 'scale-100'
                }`}
                onLoad={() => {
                  setImageLoadStates(prev => ({...prev, [index]: 'loaded'}))
                  console.log(`Imagen cargada: ${image.src}`)
                }}
                onError={(e) => {
                  setImageLoadStates(prev => ({...prev, [index]: 'error'}))
                  console.error(`Error cargando imagen: ${image.src}`, e)
                }}
                style={{
                  backgroundColor: imageLoadStates[index] === 'error' ? '#f3f4f6' : 'transparent'
                }}
                loading={index <= 1 ? 'eager' : 'lazy'}
              />
              {imageLoadStates[index] === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center text-gray-500">
                    <p className="text-sm">Error cargando imagen</p>
                    <p className="text-xs">{image.title}</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-700 ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <h3 className="text-xl md:text-2xl font-bold mb-2 transform transition-transform duration-700 delay-200">
                  {image.title}
                </h3>
                <p className="text-sm md:text-base opacity-90 transform transition-transform duration-700 delay-300">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white hover:scale-110 rounded-full p-3 shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white hover:scale-110 rounded-full p-3 shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Play/Pause button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 shadow-lg transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
          aria-label={isPlaying ? 'Pausar presentación' : 'Reproducir presentación'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        {/* Progress indicator */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/30"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-white"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{currentSlide + 1}</span>
            </div>
          </div>
        </div>

        {/* Enhanced dots indicator */}
        <div className="flex justify-center mt-6 space-x-3" role="tablist" aria-label="Navegación de imágenes">
          {workImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? "w-8 h-3 bg-orange-500 shadow-lg" 
                  : "w-3 h-3 bg-gray-300 hover:bg-orange-300 hover:scale-125"
              }`}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Ir a ${image.title}`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-orange-400 rounded-full animate-pulse opacity-50" />
              )}
            </button>
          ))}
        </div>

        {/* Enhanced thumbnails for desktop */}
        <div className="hidden md:flex justify-center mt-8 space-x-4">
          {workImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative w-24 h-18 rounded-xl overflow-hidden transition-all duration-300 transform ${
                index === currentSlide 
                  ? "ring-3 ring-orange-500 scale-110 shadow-xl" 
                  : "opacity-70 hover:opacity-100 hover:scale-105 shadow-md hover:shadow-lg"
              }`}
              aria-label={`Ver ${image.title}`}
            >
              <img 
                src={image.src || "/placeholder.svg"} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                loading="lazy"
                onLoad={() => console.log(`Thumbnail cargada: ${image.src}`)}
                onError={(e) => console.error(`Error cargando thumbnail: ${image.src}`, e)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-1 left-1 right-1 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                {image.title}
              </div>
              {index === currentSlide && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Hero Section */}
      <header className="bg-gradient-to-br from-gray-700 via-gray-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Logo and Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Image
                  src="/logofercool.png"
                  alt="Logo Fercool - Servicio técnico de aire acondicionado"
                  width={250}
                  height={80}
                  className="h-16 w-auto mr-4"
                  priority
                />
                <h1 className="text-4xl lg:text-5xl font-bold">
                  <span className="text-gray-800" style={{textShadow: '0.5px 0.5px 0 white, -0.5px -0.5px 0 white, 0.5px -0.5px 0 white, -0.5px 0.5px 0 white, 0 0.5px 0 white, 0 -0.5px 0 white, 0.5px 0 0 white, -0.5px 0 0 white'}}>Fer</span>
                  <span className="text-orange-500">cool</span>
                </h1>
              </div>

              <h2 className="text-xl lg:text-2xl mb-6 font-light">
                Instalación y mantenimiento de aire acondicionado en Iquitos
              </h2>

              <p className="text-lg mb-8 opacity-90">
                Técnicos especializados con más de 10 años de experiencia. Servicio rápido, confiable y con garantía.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg shadow-lg"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${whatsappNumber}?text=Hola, necesito servicio técnico de aire acondicionado`,
                      "_blank",
                    )
                  }
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-700 px-8 py-4 text-lg bg-transparent"
                  onClick={() => window.open(`tel:+${phoneNumber}`, "_self")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </Button>
              </div>
            </div>

            {/* Technician Image */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Image
                  src="/ac-technician.png"
                  alt="Técnico de Fercooll trabajando"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">Nuestros Servicios</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Gallery Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
            Nuestros Trabajos Realizados
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Conoce algunos de los proyectos que hemos completado con éxito para nuestros clientes en Iquitos
          </p>

          <WorkCarousel />
        </div>
      </section>

      {/* ChatBot */}
      <SimpleChatBot whatsappNumber={whatsappNumber} />

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">¿Por qué elegir Fercooll?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="mr-4">{benefit.icon}</div>
                <span className="text-lg font-medium text-gray-800">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">Zona de Servicio</h2>

          <div className="flex justify-center mb-6">
            <MapPin className="w-12 h-12 text-orange-500" />
          </div>

          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Atendemos en toda la ciudad de Iquitos y alrededores. Servicio rápido y confiable donde lo necesites.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="font-semibold text-lg mb-2">Cobertura completa en:</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Centro de Iquitos</li>
              <li>• Belén</li>
              <li>• Punchana</li>
              <li>• San Juan Bautista</li>
              <li>• Zonas aledañas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
            Lo que dicen nuestros clientes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-800">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">Nuestros Clientes</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Empresas e instituciones que confían en nuestro servicio técnico profesional
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {/* Client logos */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full h-24 flex items-center justify-center">
              <Image
                src="/client-logo-apersud.png"
                alt="APERSUD"
                width={120}
                height={60}
                className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full h-24 flex items-center justify-center">
              <Image
                src="/client-logo-alfie.png"
                alt="ALFIE"
                width={120}
                height={60}
                className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-orange-500" />
                <span className="text-sm font-medium">+200 empresas atendidas</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-orange-500" />
                <span className="text-sm font-medium">+1000 equipos instalados</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                <span className="text-sm font-medium">10+ años de experiencia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-gradient-to-r from-gray-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">¿Necesitas servicio técnico?</h2>
          <p className="text-xl mb-8 opacity-90">Contáctanos ahora y solucionamos tu problema hoy mismo</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg flex-1"
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=¡Hola! Necesito servicio técnico de aire acondicionado urgente`,
                  "_blank",
                )
              }
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              ¡Solicita tu servicio ahora!
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-700 px-8 py-4 text-lg flex-1 bg-transparent"
              onClick={() => window.open(`tel:+${phoneNumber}`, "_self")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/logofercool.png"
                  alt="Fercool Logo"
                  width={40}
                  height={40}
                  className="mr-3"
                  priority
                />
                <h3 className="text-2xl font-bold">
                  <span className="text-gray-800" style={{textShadow: '0.5px 0.5px 0 white, -0.5px -0.5px 0 white, 0.5px -0.5px 0 white, -0.5px 0.5px 0 white'}}>Fer</span>
                  <span className="text-orange-500">cool</span>
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Especialistas en aire acondicionado en Iquitos. Servicio técnico profesional y confiable.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+51 965 703 253</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>WhatsApp: +51 965 703 253</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@fercooll.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Iquitos, Perú</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-orange-500 hover:border-orange-500 bg-transparent"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-orange-400 hover:border-orange-400 bg-transparent"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fercooll. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg animate-pulse"
          onClick={() =>
            window.open(`https://wa.me/${whatsappNumber}?text=Hola, necesito información sobre sus servicios`, "_blank")
          }
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
