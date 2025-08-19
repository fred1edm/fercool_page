"use client"

import { useState } from "react"
import { Bot, X, Send, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

// Configuración de servicios y preguntas
const SERVICES_CONFIG = [
  {
    id: "instalacion",
    title: "Instalación de aire acondicionado",
    description: "Instalación profesional de equipos nuevos",
    questions: [
      {
        id: "ubicacion",
        label: "Ubicación del servicio",
        type: "text",
        placeholder: "Ej: Av. Siempre Viva 123, Lima",
        required: true
      },
      {
        id: "tipo_equipo",
        label: "Tipo de equipo a instalar",
        type: "select",
        options: ["Split", "Ventana", "Cassette", "Ducto", "VRV/VRF"],
        required: true
      },
      {
        id: "btu",
        label: "BTU del equipo",
        type: "select",
        options: ["9,000 BTU", "12,000 BTU", "18,000 BTU", "24,000 BTU", "36,000 BTU", "Otro"],
        required: false
      },
      {
        id: "disponibilidad",
        label: "Disponibilidad horaria",
        type: "select",
        options: ["Mañana (8am-12pm)", "Tarde (12pm-6pm)", "Todo el día", "Fin de semana"],
        required: true
      }
    ]
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento preventivo y correctivo",
    description: "Mantenimiento para óptimo funcionamiento",
    questions: [
      {
        id: "ubicacion",
        label: "Ubicación del servicio",
        type: "text",
        placeholder: "Ej: Av. Siempre Viva 123, Lima",
        required: true
      },
      {
        id: "tipo_equipo",
        label: "Tipo de equipo",
        type: "select",
        options: ["Split", "Ventana", "Cassette", "Ducto", "VRV/VRF"],
        required: true
      },
      {
        id: "btu",
        label: "BTU del equipo",
        type: "select",
        options: ["9,000 BTU", "12,000 BTU", "18,000 BTU", "24,000 BTU", "36,000 BTU", "Otro"],
        required: false
      },
      {
        id: "disponibilidad",
        label: "Disponibilidad horaria",
        type: "select",
        options: ["Mañana (8am-12pm)", "Tarde (12pm-6pm)", "Todo el día", "Fin de semana"],
        required: true
      },
      {
        id: "problema",
        label: "Describe el problema (opcional)",
        type: "textarea",
        placeholder: "Ej: El equipo no enfría bien, hace ruido...",
        required: false
      }
    ]
  },
  {
    id: "recarga",
    title: "Recarga de gas refrigerante",
    description: "Recarga profesional de gas R410A, R22, etc.",
    questions: [
      {
        id: "ubicacion",
        label: "Ubicación del servicio",
        type: "text",
        placeholder: "Ej: Av. Siempre Viva 123, Lima",
        required: true
      },
      {
        id: "tipo_equipo",
        label: "Tipo de equipo",
        type: "select",
        options: ["Split", "Ventana", "Cassette", "Ducto", "VRV/VRF"],
        required: true
      },
      {
        id: "tipo_gas",
        label: "Tipo de gas (si lo conoce)",
        type: "select",
        options: ["R410A", "R22", "R134A", "No sé"],
        required: false
      },
      {
        id: "disponibilidad",
        label: "Disponibilidad horaria",
        type: "select",
        options: ["Mañana (8am-12pm)", "Tarde (12pm-6pm)", "Todo el día", "Fin de semana"],
        required: true
      }
    ]
  },
  {
    id: "reparacion",
    title: "Reparación de fallas",
    description: "Diagnóstico y reparación de averías",
    questions: [
      {
        id: "ubicacion",
        label: "Ubicación del servicio",
        type: "text",
        placeholder: "Ej: Av. Siempre Viva 123, Lima",
        required: true
      },
      {
        id: "tipo_equipo",
        label: "Tipo de equipo",
        type: "select",
        options: ["Split", "Ventana", "Cassette", "Ducto", "VRV/VRF"],
        required: true
      },
      {
        id: "problema",
        label: "Describe el problema",
        type: "textarea",
        placeholder: "Ej: No enciende, no enfría, hace ruido extraño...",
        required: true
      },
      {
        id: "urgencia",
        label: "Nivel de urgencia",
        type: "select",
        options: ["Normal", "Urgente", "Emergencia"],
        required: true
      },
      {
        id: "disponibilidad",
        label: "Disponibilidad horaria",
        type: "select",
        options: ["Mañana (8am-12pm)", "Tarde (12pm-6pm)", "Todo el día", "Fin de semana"],
        required: true
      }
    ]
  },
  {
    id: "limpieza",
    title: "Limpieza profunda",
    description: "Limpieza completa de filtros y componentes",
    questions: [
      {
        id: "ubicacion",
        label: "Ubicación del servicio",
        type: "text",
        placeholder: "Ej: Av. Siempre Viva 123, Lima",
        required: true
      },
      {
        id: "tipo_equipo",
        label: "Tipo de equipo",
        type: "select",
        options: ["Split", "Ventana", "Cassette", "Ducto", "VRV/VRF"],
        required: true
      },
      {
        id: "cantidad",
        label: "Cantidad de equipos",
        type: "select",
        options: ["1 equipo", "2 equipos", "3 equipos", "4+ equipos"],
        required: true
      },
      {
        id: "disponibilidad",
        label: "Disponibilidad horaria",
        type: "select",
        options: ["Mañana (8am-12pm)", "Tarde (12pm-6pm)", "Todo el día", "Fin de semana"],
        required: true
      }
    ]
  },
  {
    id: "cotizacion",
    title: "Cotización",
    description: "Solicitar presupuesto personalizado",
    questions: [
      {
        id: "tipo_servicio",
        label: "Tipo de servicio",
        type: "select",
        options: ["Instalación", "Mantenimiento", "Reparación", "Limpieza", "Recarga de gas", "Varios servicios"],
        required: true
      },
      {
        id: "cantidad_equipos",
        label: "Cantidad de equipos",
        type: "select",
        options: ["1 equipo", "2 equipos", "3 equipos", "4+ equipos"],
        required: true
      },
      {
        id: "ubicacion",
        label: "Ubicación del servicio",
        type: "text",
        placeholder: "Ej: Av. Siempre Viva 123, Lima",
        required: true
      },
      {
        id: "disponibilidad",
        label: "Disponibilidad horaria",
        type: "select",
        options: ["Mañana (8am-12pm)", "Tarde (12pm-6pm)", "Todo el día", "Fin de semana"],
        required: true
      },
      {
        id: "presupuesto",
        label: "Presupuesto estimado (opcional)",
        type: "select",
        options: ["Menos de S/200", "S/200 - S/500", "S/500 - S/1000", "Más de S/1000", "No tengo presupuesto definido"],
        required: false
      },
      {
        id: "detalles",
        label: "Detalles adicionales (opcional)",
        type: "textarea",
        placeholder: "Cualquier información adicional que considere importante...",
        required: false
      }
    ]
  }
]

interface SimpleChatBotProps {
  whatsappNumber: string
}

export default function SimpleChatBot({ whatsappNumber }: SimpleChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<'service' | 'questions'>('service')
  const [selectedService, setSelectedService] = useState<typeof SERVICES_CONFIG[0] | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleServiceSelect = (service: typeof SERVICES_CONFIG[0]) => {
    setSelectedService(service)
    setCurrentStep('questions')
    setFormData({})
    setErrors({})
  }

  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionId]: value }))
    // Limpiar error si existe
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }))
    }
  }

  const validateForm = () => {
    if (!selectedService) return false
    
    const newErrors: Record<string, string> = {}
    
    selectedService.questions.forEach(question => {
      if (question.required && !formData[question.id]?.trim()) {
        newErrors[question.id] = `${question.label} es obligatorio`
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateWhatsAppMessage = () => {
    if (!selectedService) return ''
    
    let message = `🔧 *SOLICITUD DE SERVICIO - FERCOOLL*\n\n`
    message += `📋 *Servicio:* ${selectedService.title}\n\n`
    
    selectedService.questions.forEach(question => {
      const value = formData[question.id]
      if (value?.trim()) {
        message += `• *${question.label}:* ${value}\n`
      }
    })
    
    message += `\n✅ Solicitud generada desde la web de Fercooll`
    
    return message
  }

  const handleSendToWhatsApp = () => {
    if (!validateForm()) return
    
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
    handleClose()
  }

  const handleDirectWhatsApp = () => {
    const message = `¡Hola! Me interesa obtener información sobre los servicios de aire acondicionado de Fercooll.`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
    handleClose()
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setCurrentStep('service')
      setSelectedService(null)
      setFormData({})
      setErrors({})
    }, 300)
  }

  const handleBack = () => {
    setCurrentStep('service')
    setSelectedService(null)
    setFormData({})
    setErrors({})
  }

  const renderQuestion = (question: typeof SERVICES_CONFIG[0]['questions'][0]) => {
    const value = formData[question.id] || ''
    const hasError = !!errors[question.id]
    
    const baseInputClasses = `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
      hasError 
        ? 'border-red-500 focus:ring-red-500' 
        : 'border-gray-300 focus:ring-blue-500'
    }`

    switch (question.type) {
      case 'text':
        return (
          <div key={question.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              placeholder={question.placeholder}
              value={value}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              onKeyDown={(e) => {
                // Asegurar que la tecla espacio funcione correctamente
                if (e.key === ' ') {
                  e.stopPropagation();
                }
              }}
              className={baseInputClasses}
              style={{ whiteSpace: 'pre-wrap' }}
            />
            {hasError && <p className="text-red-500 text-xs">{errors[question.id]}</p>}
          </div>
        )
      
      case 'select':
        return (
          <div key={question.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={baseInputClasses}
            >
              <option value="">Seleccionar...</option>
              {question.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {hasError && <p className="text-red-500 text-xs">{errors[question.id]}</p>}
          </div>
        )
      
      case 'textarea':
        return (
          <div key={question.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              placeholder={question.placeholder}
              value={value}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              rows={3}
              className={baseInputClasses}
            />
            {hasError && <p className="text-red-500 text-xs">{errors[question.id]}</p>}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>

      {/* Ventana del chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-2xl border z-50 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <div>
                <h3 className="font-semibold">Asistente Fercooll</h3>
                <p className="text-xs opacity-90">Especialistas en climatización</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-blue-800 p-1 rounded-full"
              onClick={handleClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Contenido */}
          <div className="max-h-96 overflow-y-auto">
            {currentStep === 'service' && (
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">¡Hola! ¿En qué podemos ayudarte?</h4>
                  <p className="text-sm text-gray-600">Selecciona el servicio que necesitas:</p>
                </div>
                
                <div className="space-y-2">
                  {SERVICES_CONFIG.map((service) => (
                    <Button
                      key={service.id}
                      variant="outline"
                      className="w-full text-left justify-start p-3 h-auto hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      onClick={() => handleServiceSelect(service)}
                    >
                      <div>
                        <div className="font-medium text-sm">{service.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{service.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full text-green-600 border-green-500 hover:bg-green-50"
                    onClick={handleDirectWhatsApp}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Solo WhatsApp
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'questions' && selectedService && (
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{selectedService.title}</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleBack}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ← Volver
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">Completa la información para generar tu solicitud:</p>
                </div>
                
                <div className="space-y-4">
                  {selectedService.questions.map(renderQuestion)}
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleSendToWhatsApp}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar a WhatsApp
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full text-green-600 border-green-500 hover:bg-green-50"
                    onClick={handleDirectWhatsApp}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Solo WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}