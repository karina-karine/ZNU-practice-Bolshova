// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Header hide/show on scroll
const header = document.querySelector(".header")
let lastScrollY = window.scrollY
let ticking = false

function updateHeader() {
  const currentScrollY = window.scrollY

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.style.transform = "translateY(-100%)"
  } else {
    header.style.transform = "translateY(0)"
  }

  lastScrollY = currentScrollY
  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateHeader)
    ticking = true
  }
})

// Counter animation
function animateCounter() {
  const digits = document.querySelectorAll(".counter-digit")
  const targetValues = ["0", "0", "2", "3", "0", "0", "2", "5"]

  digits.forEach((digit, index) => {
    if (targetValues[index] !== undefined) {
      let current = 0
      const target = Number.parseInt(targetValues[index])
      const duration = 2000
      const steps = 60
      const increment = target / steps
      const stepDuration = duration / steps

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        digit.textContent = Math.floor(current)
      }, stepDuration)
    }
  })
}

// Trigger counter animation when support section is visible
const supportSection = document.getElementById("support")
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter()
        counterObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (supportSection) {
  counterObserver.observe(supportSection)
}

// Newsletter form submission
document.getElementById("newsletter-form").addEventListener("submit", function (e) {
  e.preventDefault()
  const btn = this.querySelector(".subscribe-btn")
  const originalText = btn.textContent

  btn.textContent = "ПІДПИСУЄМО..."
  btn.disabled = true
  btn.style.opacity = "0.7"

  setTimeout(() => {
    btn.textContent = "ПІДПИСАНО!"
    btn.style.background = "#28a745"

    setTimeout(() => {
      btn.textContent = originalText
      btn.disabled = false
      btn.style.opacity = "1"
      btn.style.background = ""
      this.reset()
    }, 2000)
  }, 1500)
})

// Enhanced hover effects for counter digits
document.querySelectorAll(".counter-digit").forEach((digit) => {
  digit.addEventListener("mouseenter", () => {
    digit.style.transform = "scale(1.1)"
    digit.style.background = "var(--primary-color)"
    digit.style.color = "var(--white)"
  })

  digit.addEventListener("mouseleave", () => {
    digit.style.transform = "scale(1)"
    digit.style.background = "var(--background-light)"
    digit.style.color = "var(--text-dark)"
  })
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation")
  }
})

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation")
})

// Performance optimization: debounce resize events
let resizeTimeout
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    console.log("Window resized")
  }, 250)
})

// Add loading state management
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Image placeholder enhancement
document.querySelectorAll(".image-placeholder").forEach((placeholder) => {
  placeholder.addEventListener("mouseenter", () => {
    placeholder.style.transform = "scale(1.02)"
  })

  placeholder.addEventListener("mouseleave", () => {
    placeholder.style.transform = "scale(1)"
  })
})
