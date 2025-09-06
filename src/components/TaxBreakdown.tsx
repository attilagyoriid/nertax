"use client";

import { useState, useEffect } from "react";
import { nf } from "@/utils/currency";
import taxData from "@/utils/taxBreakdown.json";
import styles from "./TaxBreakdown.module.css";

interface TaxBreakdownProps {
  monthlyGross: number;
  triggerAnimation: boolean;
}

export default function TaxBreakdown({
  monthlyGross,
  triggerAnimation,
}: TaxBreakdownProps) {
  const [visibleItems, setVisibleItems] = useState(0);
  const [animatingRemaining, setAnimatingRemaining] = useState<number[]>([]);
  const [animatingPercent, setAnimatingPercent] = useState<number[]>([]);
  const [animatingEmoji, setAnimatingEmoji] = useState<number[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [maxZoom, setMaxZoom] = useState(15);
  const [taxCounter, setTaxCounter] = useState(0);
  const [remainingCounter, setRemainingCounter] = useState(0);
  const [taxPercentCounter, setTaxPercentCounter] = useState(0);
  const [remainingPercentCounter, setRemainingPercentCounter] = useState(0);
  const [animatingImages, setAnimatingImages] = useState<number[]>([]);
  const [completedImages, setCompletedImages] = useState<number[]>([]);
  const [showSummaryPlaceholder, setShowSummaryPlaceholder] = useState(false);

  useEffect(() => {
    const calculateMaxZoom = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const cardWidth = 200; // approximate card width
      const cardHeight = 80; // approximate card height

      const maxScaleX = (screenWidth * 0.8) / cardWidth;
      const maxScaleY = (screenHeight * 0.8) / cardHeight;
      const calculatedZoom = Math.min(maxScaleX, maxScaleY, 15);

      setMaxZoom(Math.max(calculatedZoom, 2));
    };

    calculateMaxZoom();
    window.addEventListener("resize", calculateMaxZoom);

    return () => window.removeEventListener("resize", calculateMaxZoom);
  }, []);

  useEffect(() => {
    if (!triggerAnimation) {
      setVisibleItems(0);
      setAnimatingRemaining([]);
      setAnimatingPercent([]);
      setAnimatingEmoji([]);
      setShowSummary(false);
      setTaxCounter(0);
      setRemainingCounter(0);
      setTaxPercentCounter(0);
      setRemainingPercentCounter(0);
      setAnimatingImages([]);
      setCompletedImages([]);
      setShowSummaryPlaceholder(false);
      return;
    }

    setVisibleItems(1);
    setAnimatingRemaining([]);
    setAnimatingPercent([]);
    setAnimatingEmoji([]);
    setShowSummary(false);
    setTaxCounter(0);
    setRemainingCounter(0);
    setTaxPercentCounter(0);
    setRemainingPercentCounter(0);
    setAnimatingImages([]);
    setCompletedImages([]);
    setShowSummaryPlaceholder(false);

    // Start percent animation for first item after tax card completes
    setTimeout(() => {
      setAnimatingPercent([0]);
    }, 800);

    // Start remaining card animation for first item
    setTimeout(() => {
      setAnimatingRemaining([0]);
    }, 1600);

    // Start emoji animation after remaining card completes
    setTimeout(() => {
      setAnimatingEmoji([0]);
    }, 4600);

    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        const newValue = prev + 1;
        if (newValue <= taxData.taxBreakdown.length) {
          // Start percent animation after tax item animation completes
          setTimeout(() => {
            setAnimatingPercent((current) => [...current, newValue - 1]);
          }, 800);
          // Start remaining card animation after tax item animation (0.8s) + 0.8s delay
          setTimeout(() => {
            setAnimatingRemaining((current) => [...current, newValue - 1]);
          }, 1600);
          // Start emoji animation after remaining card completes
          setTimeout(() => {
            setAnimatingEmoji((current) => [...current, newValue - 1]);
          }, 4600);
          // Fade out previous emoji when next one starts
          if (newValue > 1) {
            setTimeout(() => {
              setAnimatingEmoji((current) => current.filter(i => i !== newValue - 2));
            }, 4600);
          }
          // Auto scroll to current tax item before it appears
          setTimeout(() => {
            const currentElement = document.querySelector(
              `[data-tax-index="${newValue - 1}"]`
            );
            if (currentElement) {
              currentElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }, 100);
          return newValue;
        }
        clearInterval(timer);
        // Start image animations after last remaining card completes
        setTimeout(() => {
          startImageAnimations();
        }, 2000);
        // Image animations will handle showing summary
        return prev;
      });
    }, 4800);

    return () => clearInterval(timer);
  }, [triggerAnimation]);

  // Tax counter animation
  useEffect(() => {
    if (!showSummary) return;
    
    const taxAmount = Math.round(monthlyGross * taxData.totals.total);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = (monthlyGross - taxAmount) / steps;
    let currentStep = 0;
    
    setTaxCounter(monthlyGross);
    
    const taxTimer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setTaxCounter(Math.round(monthlyGross - (stepValue * currentStep)));
      } else {
        setTaxCounter(taxAmount);
        clearInterval(taxTimer);
      }
    }, duration / steps);
    
    return () => clearInterval(taxTimer);
  }, [showSummary, monthlyGross]);

  // Remaining counter animation
  useEffect(() => {
    if (!showSummary) return;
    
    const remainingAmount = Math.round(monthlyGross * (1 - taxData.totals.total));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = (monthlyGross - remainingAmount) / steps;
    let currentStep = 0;
    
    // Start after tax animation (3s delay)
    setTimeout(() => {
      setRemainingCounter(monthlyGross);
      
      const remainingTimer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setRemainingCounter(Math.round(monthlyGross - (stepValue * currentStep)));
        } else {
          setRemainingCounter(remainingAmount);
          clearInterval(remainingTimer);
        }
      }, duration / steps);
    }, 3000);
  }, [showSummary, monthlyGross]);

  // Tax percentage count up animation
  useEffect(() => {
    if (!showSummary) return;
    
    const taxPercent = Math.round(taxData.totals.total * 100);
    const duration = 2000;
    const steps = 60;
    const stepValue = taxPercent / steps;
    let currentStep = 0;
    
    setTaxPercentCounter(0);
    
    const taxPercentTimer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setTaxPercentCounter(Math.round(stepValue * currentStep));
      } else {
        setTaxPercentCounter(taxPercent);
        clearInterval(taxPercentTimer);
      }
    }, duration / steps);
    
    return () => clearInterval(taxPercentTimer);
  }, [showSummary]);

  // Remaining percentage count up animation
  useEffect(() => {
    if (!showSummary) return;
    
    const remainingPercent = Math.round((1 - taxData.totals.total) * 100);
    const duration = 2000;
    const steps = 60;
    const stepValue = remainingPercent / steps;
    let currentStep = 0;
    
    // Start after tax animation (3s delay)
    setTimeout(() => {
      setRemainingPercentCounter(0);
      
      const remainingPercentTimer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setRemainingPercentCounter(Math.round(stepValue * currentStep));
        } else {
          setRemainingPercentCounter(remainingPercent);
          clearInterval(remainingPercentTimer);
        }
      }, duration / steps);
    }, 3000);
  }, [showSummary]);

  const startImageAnimations = () => {
    const animateNextImage = (index: number) => {
      if (index >= taxData.taxBreakdown.length) {
        // All images animated, show placeholder and scroll to it
        setTimeout(() => {
          setShowSummaryPlaceholder(true);
          setTimeout(() => {
            const placeholderElement = document.querySelector('.summary-placeholder');
            if (placeholderElement) {
              placeholderElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
            setTimeout(() => {
              setShowSummaryPlaceholder(false);
              setShowSummary(true);
            }, 1000);
          }, 100);
        }, 1000);
        return;
      }
      
      setAnimatingImages(current => [...current, index]);
      
      // Scroll to target tax item
      setTimeout(() => {
        const targetElement = document.querySelector(`[data-tax-index="${index}"]`);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
      
      // Wait for current animation to complete (3s) then mark as completed and start next
      setTimeout(() => {
        setCompletedImages(current => [...current, index]);
        animateNextImage(index + 1);
      }, 3000);
    };
    
    animateNextImage(0);
  };

  const getColorIntensity = (index: number) => {
    const intensity = (index + 1) / taxData.taxBreakdown.length;
    const red = Math.round(255 * intensity);
    return `rgb(${red}, ${Math.round(100 * (1 - intensity))}, ${Math.round(
      100 * (1 - intensity)
    )})`;
  };

  let remainingAmount = monthlyGross;

  return (
    <section className={styles.container}>
      {taxData.taxBreakdown.slice(0, visibleItems).map((tax, index) => {
        const amount = monthlyGross * tax.rate;
        remainingAmount -= amount;
        const borderColor = getColorIntensity(index);

        return (
          <div key={tax.id} data-tax-index={index}>
            <div 
              className={styles.taxItem}
              style={{
                backgroundImage: completedImages.includes(index) ? `url(${tax.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <span 
                className={`${styles.taxName} ${completedImages.includes(index) ? styles.fadeOut : ''}`}
              >
                {tax.name}
              </span>
              <div className={`${styles.taxRate} ${completedImages.includes(index) ? styles.orangeCircle : ''}`}>
                <span
                  className={
                    animatingPercent.includes(index) ? styles.percentBounce : ""
                  }
                  style={{
                    color: completedImages.includes(index) ? 'white' : borderColor,
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {(tax.rate * 100) % 1 === 0
                    ? (tax.rate * 100).toFixed(0)
                    : (tax.rate * 100).toFixed(1)}
                  %
                </span>
              </div>
              <div 
                className={`${styles.taxAmount} ${completedImages.includes(index) ? styles.fadeOut : ''}`}
              >
                {nf.format(Math.round(amount))} / hó
              </div>
              <div 
                className={`${styles.taxDescription} ${completedImages.includes(index) ? styles.fadeOut : ''}`}
              >
                {tax.description}
              </div>
            </div>
            <div className={styles.placeholder}>
              <div
                className={`${styles.remainingCard} ${
                  animatingRemaining.includes(index) ? styles.animate : ""
                }`}
                style={
                  {
                    borderColor,
                    backgroundColor: borderColor
                      .replace("rgb", "rgba")
                      .replace(")", ", 0.9)"),
                    "--max-zoom": maxZoom,
                    "--mid-zoom": maxZoom * 0.8,
                  } as React.CSSProperties
                }
              >
                {animatingEmoji.includes(index) && (
                  <div className={styles.emoji}>
                    {tax.emotion}
                  </div>
                )}
                <div className={styles.remainingHeader}>
                  Eddig ennyi maradt:
                </div>
                <div className={styles.remainingAmount}>
                  {nf.format(Math.round(remainingAmount))} / hó
                </div>
              </div>
            </div>

          </div>
        );
      })}
      
      {animatingImages.length > 0 && (() => {
        const currentImageIndex = animatingImages[animatingImages.length - 1];
        
        // Calculate target position after a small delay to ensure element is rendered
        setTimeout(() => {
          const imageElement = document.querySelector(`[data-image-index="${currentImageIndex}"]`);
          const targetElement = document.querySelector(`[data-tax-index="${currentImageIndex}"] .${styles.taxItem}`);
          const rect = targetElement?.getBoundingClientRect();
          
          if (imageElement && rect) {
            const isMobile = window.innerWidth <= 480;
            const leftOffset = isMobile ? -40 : -100;
            const topOffset = isMobile ? -20 : -50;
            
            (imageElement as HTMLElement).style.setProperty('--target-left', `${rect.left + rect.width / 2}px`);
            (imageElement as HTMLElement).style.setProperty('--target-top', `${rect.top + rect.height / 2}px`);
            (imageElement as HTMLElement).style.setProperty('--mobile-left-offset', `${leftOffset}px`);
            (imageElement as HTMLElement).style.setProperty('--mobile-top-offset', `${topOffset}px`);
          }
        }, 100);
        
        return (
          <div 
            key={`image-${currentImageIndex}`}
            data-image-index={currentImageIndex}
            className={`${styles.taxImage} ${styles.animate}`}
            style={{
              "--max-zoom": Math.min((window.innerWidth * 0.8) / 200, 4),
              "--mid-zoom": Math.min((window.innerWidth * 0.8) / 200 * 0.8, 3.2),
              "--target-left": '50vw',
              "--target-top": '50vh',
            } as React.CSSProperties}
          >
            <img src={taxData.taxBreakdown[currentImageIndex].image} alt={taxData.taxBreakdown[currentImageIndex].name} />
          </div>
        );
      })()}
      
      {showSummaryPlaceholder && (
        <div className="summary-placeholder" style={{ height: '300px', opacity: 0 }}></div>
      )}
      
      {showSummary && (
        <div className={styles.summaryContainer}>
          <h2 className={styles.summaryTitle}>"Annyit érsz amennyid van"</h2>
          <div className={styles.pieChartContainer}>
            <div 
              className={styles.pieChart}
              style={{
                '--tax-percentage': taxData.totals.total * 100,
                '--remaining-percentage': (1 - taxData.totals.total) * 100
              } as React.CSSProperties}
            >
              <div className={styles.pieSliceTax}></div>
              <div className={styles.pieSliceRemaining}></div>
              <div className={styles.pieLabels}>
                <div className={styles.remainingText}>
                  <div className={styles.remainingAmount}>{nf.format(remainingCounter || Math.round(monthlyGross * (1 - taxData.totals.total)))}</div>
                  <div className={styles.remainingPercent}>{remainingPercentCounter || Math.round((1 - taxData.totals.total) * 100)}%</div>
                </div>
                <div className={styles.taxText}>
                  <div className={styles.taxAmount}>{nf.format(taxCounter || Math.round(monthlyGross * taxData.totals.total))}</div>
                  <div className={styles.taxPercent}>{taxPercentCounter || Math.round(taxData.totals.total * 100)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
