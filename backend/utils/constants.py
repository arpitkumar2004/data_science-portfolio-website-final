"""Constants and email templates"""
from datetime import datetime

# Email template for contact form acknowledgment
def get_contact_acknowledgment_email(name: str, subject: str, message: str, calendly_link: str, frontend_url: str, phone: str):
    """Generate HTML email for contact form acknowledgment"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{ margin: 0; padding: 0; background-color: #f8fafc; }}
            .container {{ font-family: 'Inter', sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }}
            .header {{ background-color: #0f172a; padding: 40px; color: #ffffff; text-align: left; }}
            .body {{ padding: 40px; color: #334155; }}
            .sys-badge {{ background: rgba(37, 99, 235, 0.1); color: #2563eb; padding: 4px 10px; border-radius: 4px; font-family: monospace; font-size: 10px; font-weight: bold; text-transform: uppercase; margin-bottom: 20px; display: inline-block; }}
            .intro-text {{ font-size: 16px; line-height: 1.6; margin-bottom: 30px; border-left: 4px solid #2563eb; padding-left: 20px; }}
            .section-header {{ font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }}
            
            /* Message Recap */
            .message-box {{ background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin: 25px 0; font-style: italic; font-size: 13px; color: #64748b; }}
            
            /* Action Buttons */
            .btn-primary {{ display: block; background-color: #2563eb; color: #ffffff !important; text-decoration: none; padding: 18px; border-radius: 12px; text-align: center; font-weight: 700; font-size: 15px; margin-bottom: 12px; }}
            .btn-group {{ display: table; width: 100%; border-spacing: 10px 0; }}
            .btn-secondary {{ display: table-cell; background-color: #ffffff; color: #0f172a !important; text-decoration: none; padding: 14px 0; border-radius: 10px; text-align: center; font-weight: 700; font-size: 13px; border: 1px solid #e2e8f0; width: 50%; }}

            .schematic {{ font-family: monospace; font-size: 10px; color: #94a3b8; text-align: center; padding: 30px; background: #f8fafc; line-height: 1.4; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div style="font-family: monospace; font-size: 11px; color: #60a5fa; margin-bottom: 10px;">INQUIRY_PARSED // SESSION: {datetime.now().strftime('%H%M%S')}</div>
                <h1 style="margin: 0; font-size: 22px; font-weight: 800;">Contact: Arpit Kumar</h1>
            </div>
            
            <div class="body">
                <div class="sys-badge">Priority Communication Enabled</div>
                <div class="intro-text">
                    Hello <b>{name}</b>,<br>
                    Thank you for reaching out via my Research portfolio Terminal regarding <b>{subject}</b>. I have successfully received your message and am reviewing the details. 
                </div>

                <div class="section-header">Original Inquiry Summary</div>
                <div class="message-box">
                    "{message[:150]}{'...' if len(message) > 150 else ''}"
                </div>

                <p style="font-size: 14px; margin-bottom: 25px;">
                    To expedite our discussion, please use the <b>Action Hub</b> below to schedule a technical sync or connect with me directly.
                </p>

                <div class="section-header">Technical Sync Hub</div>
                <a href="{calendly_link}" class="btn-primary">🗓️ Schedule a 15-30 Min Sync</a>
                
                <div class="btn-group">
                    <a href="https://wa.me/{phone}" class="btn-secondary">💬 Direct WhatsApp</a>
                    <a href="{frontend_url}/projects" class="btn-secondary">📂 Research Portfolio</a>
                </div>
            </div>

            <div class="schematic">
                ------------------------------------------<br>
                AI_RESEARCHER // IIT_KHARAGPUR_SCHOLAR<br>
                © {datetime.now().year} ARPITKUMAR.DEV
            </div>
        </div>
    </body>
    </html>
    """


# Email template for CV request
def get_cv_request_email(name: str, company: str, subject_line: str, frontend_url: str, phone: str):
    """Generate HTML email for CV request with performance metrics"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{ margin: 0; padding: 0; background-color: #f1f5f9; }}
            .container {{ font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 20px auto; border-radius: 20px; overflow: hidden; background-color: #ffffff; box-shadow: 0 20px 50px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }}
            
            /* Neural Header */
            .header {{ background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 45px 35px; color: #ffffff; position: relative; }}
            .log-tag {{ font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 11px; color: #3b82f6; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; opacity: 0.9; }}
            .title {{ font-size: 28px; font-weight: 900; letter-spacing: -1px; margin: 0; line-height: 1; }}
            
            .body {{ padding: 40px; color: #334155; }}
            
            /* Execution Context */
            .context-box {{ border-left: 4px solid #2563eb; padding: 2px 0 2px 20px; margin-bottom: 35px; }}
            .greeting {{ font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }}
            .meta-desc {{ font-size: 14px; color: #64748b; line-height: 1.6; }}

            /* Technical Specification Matrix */
            .spec-header {{ font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 2.5px; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }}
            .spec-item {{ margin-bottom: 25px; }}
            .spec-label {{ font-weight: 800; color: #2563eb; font-size: 13px; font-family: monospace; display: block; margin-bottom: 4px; }}
            .spec-value {{ font-size: 14px; font-weight: 600; color: #1e293b; margin: 0; }}
            .spec-detail {{ font-size: 13px; color: #64748b; margin-top: 4px; line-height: 1.5; }}

            /* Performance Dashboard */
            .dashboard {{ background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px; margin: 35px 0; }}
            .metric-row {{ margin-bottom: 18px; }}
            .metric-info {{ display: flex; justify-content: space-between; font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 8px; }}
            .progress-bg {{ height: 8px; background: #e2e8f0; border-radius: 10px; overflow: hidden; }}
            .progress-fill {{ height: 100%; background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%); border-radius: 10px; }}

            /* CTA: The Action Layer */
            .btn-primary {{ display: block; background-color: #0f172a; color: #ffffff !important; text-decoration: none; padding: 20px; border-radius: 14px; text-align: center; font-weight: 800; font-size: 15px; margin-bottom: 12px; box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15); }}
            .btn-secondary {{ display: inline-block; width: 48%; background-color: #ffffff; color: #0f172a !important; text-decoration: none; padding: 14px 0; border-radius: 12px; text-align: center; font-weight: 700; font-size: 13px; border: 1px solid #e2e8f0; }}
            
            .schematic {{ font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #cbd5e1; text-align: center; padding: 30px; background: #0f172a; line-height: 1.6; margin-top: 20px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="log-tag">Handshake: Successful // ID: {datetime.now().strftime('%Y%j%H%M')}</div>
                <h1 class="title">AI Researcher Dossier</h1>
            </div>
            
            <div class="body">
                <div class="context-box">
                    <div class="greeting">System Ready, {name}.</div>
                    <div class="meta-desc">
                        Receiving request from <b>{company}</b> regarding <b>{subject_line.replace('CV Request: ', '')}</b>. 
                        Authorized for transmission of Technical CV and research artifacts.
                    </div>
                </div>

                <div class="spec-header">Candidate Specification</div>
                
                <div class="spec-item">
                    <span class="spec-label">&lt;foundation_rigor&gt;</span>
                    <p class="spec-value">IIT Kharagpur | Integrated Dual Degree</p>
                    <p class="spec-detail">8.46 CGPA. Specialized in mathematical derivation of backprop, custom loss functions, and non-linear optimization.</p>
                </div>

                <div class="spec-item">
                    <span class="spec-label">&lt;generative_expertise&gt;</span>
                    <p class="spec-value">LLM Fine-tuning & Agentic RAG</p>
                    <p class="spec-detail">Experience in transformer pruning, JAX-based training, and orchestrating low-latency inference pipelines for GenAI products.</p>
                </div>

                <div class="spec-item">
                    <span class="spec-label">&lt;production_ml&gt;</span>
                    <p class="spec-value">Architecting at Scale (MLOps)</p>
                    <p class="spec-detail">Bridging research and production using Docker, containerization, and FastAPI to handle high-concurrency data streams.</p>
                </div>

                <div class="dashboard">
                    <div style="font-size: 12px; font-weight: 900; color: #0f172a; margin-bottom: 20px; letter-spacing: 1px;">CORE COMPETENCY INDEX</div>
                    
                    <div class="metric-row">
                        <div class="metric-info"><span>Deep Learning (PyTorch/JAX)</span> <span>96%</span></div>
                        <div class="progress-bg"><div class="progress-fill" style="width: 96%;"></div></div>
                    </div>
                    
                    <div class="metric-row">
                        <div class="metric-info"><span>GenAI & LLM Ops</span> <span>92%</span></div>
                        <div class="progress-bg"><div class="progress-fill" style="width: 92%;"></div></div>
                    </div>
                    
                    <div class="metric-row">
                        <div class="metric-info"><span>NLP (Transformers/BERT)</span> <span>94%</span></div>
                        <div class="progress-bg"><div class="progress-fill" style="width: 94%;"></div></div>
                    </div>
                </div>

                <div class="spec-header">Initialize Collaboration</div>
                <a href="https://calendly.com/kumararpit17773/30min" class="btn-primary">Schedule Technical Interview &rarr;</a>
                
                <div style="width: 100%;">
                    <a href="{frontend_url}/projects" class="btn-secondary">Explore Research</a>
                    <a href="https://wa.me/{phone}" class="btn-secondary" style="float: right;">Direct Secure Chat</a>
                </div>
            </div>

            <div class="schematic">
                // DATA_SCIENCE_LOG_TERMINAL<br>
                [STATUS: READY_FOR_INFERENCE]<br>
                [LATENCY: OPTIMIZED]<br>
                ------------------------------------<br>
                NLP // COMPUTER_VISION // MLOPS<br>
                © {datetime.now().year} ARPIT_KUMAR_IIT_KGP
            </div>
        </div>
    </body>
    </html>
    """
