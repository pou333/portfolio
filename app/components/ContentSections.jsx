'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import captureEvent from '../lib/analytics';

const defaultContactForm = {
	button: 'Message me',
	close: 'Close',
	email: 'Email',
	emailError: 'Enter a valid email.',
	message: 'Message',
	messageError: 'Message should be at least 10 characters.',
	messagePlaceholder: 'Tell me briefly about the role, project, or question.',
	name: 'Name',
	nameError: 'Name is required.',
	namePlaceholder: 'Your name',
	sending: 'Sending...',
	sendError:
		'Message could not be sent. Please try again or email me directly.',
	sendSuccess: 'Message sent. I will reply soon.',
	status: 'Please wait a moment before sending again.',
	submit: 'Send request',
	title: "Let's collaborate",
};

function ContactEmail({ paragraph }) {
	const [copied, setCopied] = useState(false);
	const email = paragraph.replace('Email:', '').trim();

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			captureEvent('portfolio_email_copied');
			window.setTimeout(() => setCopied(false), 1400);
		} catch {
			setCopied(false);
		}
	};

	return (
		<p className="contact-email-line">
			<span>Email: </span>
			<button
				aria-label={`Copy email ${email}`}
				className="contact-email"
				onClick={copyEmail}
				type="button"
			>
				{email}
			</button>
			<span className={`copy-status ${copied ? 'is-visible' : ''}`}>
				Copied
			</span>
		</p>
	);
}

function ContactForm({
	config = defaultContactForm,
	language = 'en',
	theme = 'dark',
}) {
	const form = { ...defaultContactForm, ...config };
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isCloseVisible, setIsCloseVisible] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState('');
	const [errors, setErrors] = useState({});
	const [lastSubmitAt, setLastSubmitAt] = useState(0);
	const backdropPointerStarted = useRef(false);
	const closeAnimation = useRef(null);
	const closeCurrent = useRef({ x: 0, y: 0 });
	const closeTarget = useRef({ x: 0, y: 0 });
	const modalRef = useRef(null);
	const closeVisible = useRef(false);
	const closeTimer = useRef(null);

	useEffect(() => {
		setMounted(true);

		return () => {
			window.clearTimeout(closeTimer.current);
			window.cancelAnimationFrame(closeAnimation.current);
		};
	}, []);

	useEffect(() => {
		document.body.classList.toggle(
			'contact-form-open',
			isOpen || isClosing,
		);
		return () => document.body.classList.remove('contact-form-open');
	}, [isClosing, isOpen]);

	const closeForm = () => {
		if (isClosing) return;

		captureEvent('portfolio_contact_form_closed', { language });
		setIsClosing(true);
		closeVisible.current = false;
		setIsCloseVisible(false);
		window.clearTimeout(closeTimer.current);
		closeTimer.current = window.setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
			setIsSubmitting(false);
			setErrors({});
			setStatus('');
		}, 900);
	};

	const openForm = () => {
		window.clearTimeout(closeTimer.current);
		setIsClosing(false);
		setIsOpen(true);
		captureEvent('portfolio_contact_form_opened', { language });
	};

	const setCloseVisibility = (nextVisible) => {
		if (closeVisible.current === nextVisible) return;

		closeVisible.current = nextVisible;
		setIsCloseVisible(nextVisible);
	};

	const moveCloseButton = () => {
		const modalElement = modalRef.current;

		if (!modalElement || !closeVisible.current) {
			closeAnimation.current = null;
			return;
		}

		const nextX =
			closeCurrent.current.x +
			(closeTarget.current.x - closeCurrent.current.x) * 0.09;
		const nextY =
			closeCurrent.current.y +
			(closeTarget.current.y - closeCurrent.current.y) * 0.09;

		closeCurrent.current = { x: nextX, y: nextY };
		modalElement.style.setProperty('--contact-close-x', `${nextX}px`);
		modalElement.style.setProperty('--contact-close-y', `${nextY}px`);
		closeAnimation.current = window.requestAnimationFrame(moveCloseButton);
	};

	const chaseCloseButton = (x, y) => {
		closeTarget.current = { x, y };

		if (closeAnimation.current) return;

		if (!closeVisible.current && closeCurrent.current.x === 0) {
			closeCurrent.current = { x, y };
		}

		closeAnimation.current = window.requestAnimationFrame(moveCloseButton);
	};

	const stopCloseButton = () => {
		setCloseVisibility(false);
		window.cancelAnimationFrame(closeAnimation.current);
		closeAnimation.current = null;
	};

	const submitForm = async (event) => {
		event.preventDefault();

		if (isSubmitting) return;

		const formElement = event.currentTarget;
		const formData = new FormData(formElement);
		const website = String(formData.get('website') || '').trim();
		const values = {
			email: String(formData.get('email') || '').trim(),
			message: String(formData.get('message') || '').trim(),
			name: String(formData.get('name') || '').trim(),
		};
		const nextErrors = {};
		const now = Date.now();

		if (website) {
			setStatus(form.status);
			setLastSubmitAt(now);
			return;
		}

		if (!values.name) nextErrors.name = form.nameError;
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
			nextErrors.email = form.emailError;
		}
		if (values.message.length < 10) {
			nextErrors.message = form.messageError;
		}
		if (now - lastSubmitAt < 10000) {
			nextErrors.form = form.status;
		}

		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) return;

		setLastSubmitAt(now);
		setIsSubmitting(true);
		setStatus(form.sending);

		try {
			const response = await fetch('/api/contact', {
				body: JSON.stringify(values),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});

			if (!response.ok) {
				throw new Error(
					response.status === 429 ? form.status : form.sendError,
				);
			}

			setStatus(form.sendSuccess);
			captureEvent('portfolio_contact_form_submitted', { language });
			formElement.reset();
		} catch (error) {
			setErrors({
				form: error instanceof Error ? error.message : form.sendError,
			});
			setStatus('');
		} finally {
			setIsSubmitting(false);
		}
	};

	const modal =
		isOpen || isClosing ? (
			<div
				ref={modalRef}
				className={`contact-modal theme-${theme} ${
					isClosing ? 'is-closing' : ''
				} ${isCloseVisible ? 'is-close-visible' : ''}`}
				data-lenis-prevent
				onMouseDown={(event) => {
					backdropPointerStarted.current =
						event.target === event.currentTarget;
				}}
				onMouseMove={(event) => {
					const formElement =
						event.currentTarget.querySelector('.contact-form');
					const formRect = formElement?.getBoundingClientRect();
					const isInsideForm =
						Boolean(event.target.closest('.contact-form')) ||
						(formRect ? event.clientX >= formRect.left : false);

					if (isInsideForm || isClosing) {
						stopCloseButton();
						return;
					}

					chaseCloseButton(event.clientX, event.clientY);
					setCloseVisibility(true);
				}}
				onMouseUp={(event) => {
					if (
						backdropPointerStarted.current &&
						event.target === event.currentTarget
					) {
						closeForm();
					}

					backdropPointerStarted.current = false;
				}}
				onMouseLeave={stopCloseButton}
				role="presentation"
			>
				<button
					aria-label={form.close}
					className="contact-form-close"
					onClick={closeForm}
					type="button"
				>
					×
				</button>
				<form
					className="contact-form"
					noValidate
					onMouseEnter={stopCloseButton}
					onSubmit={submitForm}
				>
					<h3>{form.title}</h3>
					<label htmlFor="contact-name">
						<span>{form.name}</span>
						<input
							id="contact-name"
							maxLength="80"
							name="name"
							placeholder={form.namePlaceholder}
							type="text"
						/>
						<small className={errors.name ? '' : 'is-empty'}>
							{errors.name || ' '}
						</small>
					</label>
					<label htmlFor="contact-email">
						<span>{form.email}</span>
						<input
							id="contact-email"
							maxLength="120"
							name="email"
							placeholder="example@domain.com"
							type="email"
						/>
						<small className={errors.email ? '' : 'is-empty'}>
							{errors.email || ' '}
						</small>
					</label>
					<label
						aria-hidden="true"
						className="contact-honeypot"
						htmlFor="contact-website"
					>
						<span>Website</span>
						<input
							autoComplete="off"
							id="contact-website"
							maxLength="120"
							name="website"
							tabIndex="-1"
							type="text"
						/>
					</label>
					<label htmlFor="contact-message">
						<span>{form.message}</span>
						<textarea
							id="contact-message"
							maxLength="1500"
							name="message"
							placeholder={form.messagePlaceholder}
							rows="5"
						/>
						<small className={errors.message ? '' : 'is-empty'}>
							{errors.message || ' '}
						</small>
					</label>
					{errors.form ? (
						<p className="contact-form-status">{errors.form}</p>
					) : null}
					{status ? (
						<p className="contact-form-status">{status}</p>
					) : null}
					<button
						aria-busy={isSubmitting}
						className="contact-form-submit"
						disabled={isSubmitting}
						type="submit"
					>
						<svg
							aria-hidden="true"
							className="submit-arrow"
							fill="none"
							viewBox="0 0 42 24"
						>
							<path
								d="M2 12H34M24 3L34 12L24 21"
								stroke="currentColor"
								strokeLinecap="square"
								strokeLinejoin="miter"
								strokeWidth="3"
							/>
						</svg>
						<span className="submit-text">
							{isSubmitting ? form.sending : form.submit}
						</span>
					</button>
				</form>
			</div>
		) : null;

	return (
		<>
			<button
				className="contact-form-trigger"
				onClick={openForm}
				type="button"
			>
				{form.button}
			</button>
			{mounted && modal ? createPortal(modal, document.body) : null}
		</>
	);
}

export default function ContentSections({
	kickers,
	language = 'en',
	sections,
	theme = 'dark',
}) {
	return (
		<div className="portfolio-content">
			{sections.map((section, index) => (
				<section
					className={`content-section ${
						index % 2 === 0 ? 'align-left' : 'align-right'
					}`}
					data-index={index}
					data-section
					id={section.id}
					key={section.id}
				>
					<div className="content-card">
						<p className="section-kicker">{kickers[index]}</p>
						<h2>{section.title}</h2>
						{section.meta ? (
							<p className="meta-line">{section.meta}</p>
						) : null}
						{section.body?.map((paragraph) =>
							paragraph.startsWith('Email:') ? (
								<ContactEmail
									key={paragraph}
									paragraph={paragraph}
								/>
							) : (
								<p key={paragraph}>{paragraph}</p>
							),
						)}
						{section.skills ? (
							<div className="skill-grid">
								{section.skills.map((skill) => (
									<span key={skill}>{skill}</span>
								))}
							</div>
						) : null}
						{section.id === 'contact' ? (
							<ContactForm
								config={section.form}
								language={language}
								theme={theme}
							/>
						) : null}
					</div>
				</section>
			))}
		</div>
	);
}
