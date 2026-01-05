'use client'

import React, { useState, useEffect } from 'react'
import { X, Send, MessageSquare, CheckCircle2 } from 'lucide-react'

interface ContactFormModalProps {
    isOpen: boolean
    onClose: () => void
    selectedService?: string
    services: { id: string; title: string }[]
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
    isOpen,
    onClose,
    selectedService,
    services
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        selectedServices: [] as string[],
        message: ''
    })

    useEffect(() => {
        if (selectedService) {
            setFormData(prev => ({
                ...prev,
                selectedServices: [selectedService]
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                selectedServices: []
            }))
        }
    }, [selectedService, isOpen])

    if (!isOpen) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;

        if (type === 'checkbox') {
            setFormData(prev => {
                const updated = checked
                    ? [...prev.selectedServices, value]
                    : prev.selectedServices.filter(s => s !== value);
                return { ...prev, selectedServices: updated };
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSuccess(true)
        setTimeout(() => {
            setIsSuccess(false)
            onClose()
        }, 3000)
    }

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-secondary-charcoal/90 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            <div className="flex min-h-full items-start md:items-center justify-center p-4 pointer-events-none">
                <div className="relative w-full max-w-2xl bg-primary/95 border border-accent/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 my-10 pointer-events-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-secondary-silver hover:text-white transition-colors z-20"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-8 md:p-10">
                        {!isSuccess ? (
                            <div className="group">
                                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                                    <MessageSquare size={28} className="text-accent mr-4" />
                                    Send Us a Message
                                </h2>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-secondary-silver">
                                                Full Name*
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white transition-all"
                                                placeholder="Your name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-secondary-silver">
                                                Email Address*
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white transition-all"
                                                placeholder="your.email@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-secondary-silver">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white transition-all"
                                                placeholder="(123) 456-7890"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-secondary-silver">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                id="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white transition-all"
                                                placeholder="Your company"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-secondary-silver">
                                            Subject*
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white transition-all"
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-3 text-sm font-medium text-secondary-silver">
                                            Services of Interest
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-secondary-charcoal/30 rounded-lg border border-secondary-silver/10">
                                            {services.map((service) => (
                                                <div key={service.id} className="flex items-center group/item">
                                                    <input
                                                        type="checkbox"
                                                        id={service.id}
                                                        name="selectedServices"
                                                        value={service.id}
                                                        checked={formData.selectedServices.includes(service.id)}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-accent bg-secondary-charcoal/50 border-secondary-silver/20 rounded focus:ring-accent/50 cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor={service.id}
                                                        className="ml-3 text-sm text-secondary-silver group-hover/item:text-white cursor-pointer transition-colors"
                                                    >
                                                        {service.title}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-secondary-silver">
                                            Message*
                                        </label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-secondary-charcoal/50 border border-secondary-silver/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent text-white resize-none transition-all"
                                            placeholder="Tell us about your project or inquiry..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="privacy"
                                                type="checkbox"
                                                className="w-4 h-4 text-accent bg-secondary-charcoal/50 border-secondary-silver/20 rounded focus:ring-accent/50 cursor-pointer"
                                                required
                                            />
                                        </div>
                                        <label htmlFor="privacy" className="ml-3 text-xs md:text-sm text-secondary-silver">
                                            I agree to the{' '}
                                            <a href="#" className="text-accent hover:underline">
                                                privacy policy
                                            </a>{' '}
                                            and consent to being contacted regarding my inquiry.
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-6 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-md border border-accent/20 hover:border-accent transition-all shadow-lg shadow-accent/10 w-full flex items-center justify-center group ${isSubmitting ? 'opacity-80' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mb-6">
                                    <CheckCircle2 size={48} className="text-accent" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-4">Message Sent!</h2>
                                <p className="text-xl text-secondary-silver">
                                    Thank you for reaching out. Our team will get back to you within 24 hours.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactFormModal
