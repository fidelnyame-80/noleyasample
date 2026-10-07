"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Heart, Smartphone, ShieldCheck } from "lucide-react";

const amounts = [25, 50, 100, 250];
const mobileMoneyProviders = ["MTN MoMo", "Telecel Cash", "AT Money"];

export default function DonatePage() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "bank">("momo");
  const [provider, setProvider] = useState(mobileMoneyProviders[0]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const selectedAmount = customAmount ? Number(customAmount) || 0 : amount;
  const currency = new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", minimumFractionDigits: 2 });

  return (
    <main className="flow-page">
      <header className="flow-header">
        <a className="brand" href="/" aria-label="Noleya home"><span className="brand-mark" aria-hidden="true">✳</span><span>NOLEYA</span></a>
        <a className="back-link" href="/"><ArrowLeft size={16} /> Back to home</a>
      </header>
      <div className="flow-layout">
        <section className="flow-intro">
          <h1>Your kindness<br />goes a long way.</h1>
          <p>Every contribution helps local communities build brighter futures through care, education, and opportunity.</p>
          <div className="impact-note"><span className="impact-mark">✳</span><span><strong>Small acts. Lasting change.</strong><br />Together, we can reach further.</span></div>
        </section>
        <section className="flow-panel" aria-labelledby="donation-title">
          <div className="panel-heading"><div><span className="step-label">YOUR CONTRIBUTION</span><h2 id="donation-title">Choose an amount</h2></div><span className="step-count">01 / 02</span></div>
          {showConfirmation ? (
            <div className="payment-preview" role="status">
              <span className="success-icon"><CheckIcon /></span>
              <span className="step-label">PAYMENT PREVIEW</span>
              <h3>Your gift is ready.</h3>
              <p>{currency.format(selectedAmount)} {monthly ? "monthly" : "one-time"} via {paymentMethod === "momo" ? provider : "Bank transfer"}.</p>
              <p className="demo-note">No payment was made. This is a preview checkout.</p>
              <button className="text-link" type="button" onClick={() => setShowConfirmation(false)}>Back to donation details <ArrowRight size={16} /></button>
            </div>
          ) : <>
          <div className="amount-grid" role="group" aria-label="Suggested donation amount">
            {amounts.map((value) => (
              <button className={`amount-option${amount === value && !customAmount ? " is-selected" : ""}`} key={value} type="button" onClick={() => { setAmount(value); setCustomAmount(""); }}>GH₵{value}</button>
            ))}
          </div>
          <label className="field-label" htmlFor="custom-amount">Or enter a custom amount</label>
          <div className="money-input"><span>GH₵</span><input id="custom-amount" inputMode="decimal" placeholder="Other amount" value={customAmount} onChange={(event) => setCustomAmount(event.target.value.replace(/[^\d.]/g, ""))} /></div>
          <label className="check-row"><input type="checkbox" checked={monthly} onChange={(event) => setMonthly(event.target.checked)} /><span className="custom-check" aria-hidden="true" /><span>Make this a monthly gift</span></label>
          <span className="field-label payment-label">Choose a payment method</span>
          <div className="payment-methods" role="group" aria-label="Payment method">
            <button type="button" className={`payment-method${paymentMethod === "momo" ? " is-selected" : ""}`} aria-pressed={paymentMethod === "momo"} onClick={() => setPaymentMethod("momo")}><Smartphone size={18} /><span>Mobile Money</span></button>
            <button type="button" className={`payment-method${paymentMethod === "bank" ? " is-selected" : ""}`} aria-pressed={paymentMethod === "bank"} onClick={() => setPaymentMethod("bank")}><Building2 size={18} /><span>Bank transfer</span></button>
          </div>
          {paymentMethod === "momo" ? (
            <div className="provider-picker">
              <span className="field-label">Select your network</span>
              <div className="provider-options" role="group" aria-label="Mobile Money network">
                {mobileMoneyProviders.map((item) => <button type="button" key={item} className={`provider-option${provider === item ? " is-selected" : ""}`} aria-pressed={provider === item} onClick={() => setProvider(item)}><span className={`provider-mark provider-${item.startsWith("MTN") ? "mtn" : item.startsWith("Telecel") ? "telecel" : "at"}`} aria-hidden="true" />{item}</button>)}
              </div>
            </div>
          ) : (
            <div className="bank-preview"><Building2 size={18} /><span><strong>Bank transfer</strong><small>Transfer details will appear here when payments are connected.</small></span></div>
          )}
          <div className="donation-summary"><span>{monthly ? "Monthly gift" : "One-time gift"}</span><strong>{currency.format(selectedAmount)} <small>GHS</small></strong></div>
          <button className="submit-button" type="button" onClick={() => setShowConfirmation(true)}>Continue to payment <ArrowRight size={18} /></button>
          <p className="secure-note"><ShieldCheck size={15} /> Secure giving preview</p>
          <p className="demo-note">This is a preview checkout. No payment will be collected.</p>
          </>}
        </section>
      </div>
      <footer className="flow-footer"><span>NOLEYA / AFRICA</span><span>Care that travels further.</span></footer>
    </main>
  );
}

function CheckIcon() {
  return <span className="check-icon-mark" aria-hidden="true">✓</span>;
}
