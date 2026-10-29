# Makes the 1200x630 share pictures in public/og/ from each page header. Add a new episode to EP, run: python3 scripts/og-images.py
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import pathlib
R=pathlib.Path(__file__).resolve().parent.parent; A=str(R/"src/assets")+"/"; O=str(R/"public/og")+"/"
FB="/usr/share/fonts/opentype/inter/Inter-Bold.otf"; FR="/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
import os
if not os.path.exists(FR): FR=FB
PINK=(233,66,162); CREAM=(248,241,227); GOLD=(216,172,74)
W,H=1200,630
def cover(im,focus_x=0.5):
    im=im.convert("RGB"); s=max(W/im.width,H/im.height); im=im.resize((round(im.width*s),round(im.height*s)),Image.LANCZOS)
    x=int((im.width-W)*focus_x); y=(im.height-H)//2; return im.crop((x,y,x+W,y+H))
def label(im,kicker,title,sub=None):
    ov=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(ov)
    for i in range(H):
        a=int(215*max(0,(i-H*0.35)/(H*0.65))**1.2); d.line([(0,i),(W,i)],fill=(6,9,23,a))
    im=im.convert("RGBA"); im.alpha_composite(ov); d=ImageDraw.Draw(im)
    d.text((56,H-196),kicker,font=ImageFont.truetype(FR,26),fill=PINK)
    f=ImageFont.truetype(FB,72)
    while d.textlength(title,font=f)>W-112: f=ImageFont.truetype(FB,f.size-4)
    d.text((54,H-160),title,font=f,fill=CREAM)
    if sub: d.text((56,H-72),sub,font=ImageFont.truetype(FR,26),fill=GOLD)
    return im.convert("RGB")
EP={"s01e01":("episode-dianne-brill.jpg","Dianne Brill",1,1),"s01e02":("episode-michael-musto.jpg","Michael Musto",1,2),
"s01e03":("episode-lisa-edelstein.jpg","Lisa Edelstein",1,3),"s01e07":("episode-rudolf-piper.jpg","Rudolf Piper",1,7),
"s02e03":("episode-susanne-bartsch.jpg","Susanne Bartsch",2,3),"s03e01":("block-patricia-field.jpg","Patricia Field",3,1),
"s03e06":("episode-eric-goode.jpg","Eric Goode",3,6),"s04e08":("episode-richie-rich.jpg","Richie Rich",4,8),
"s05e06":("episode-christopher-makos.jpg","Christopher Makos",5,6),"s06e01":("episode-james-st-james.jpg","James St. James",6,1),
"s06e03":("episode-chi-chi-valenti-johnny-dynell.jpg","Chi Chi Valenti & Johnny Dynell",6,3),
"s05e04":("episode-nick-egan.jpg","Nick Egan",5,4),
"s04e10":("episode-ann-magnuson.jpg","Ann Magnuson",4,10),
"s02e08":("polaroid-michelangelo-signorile.jpg","Michelangelo Signorile",2,8),
"s05e03":("polaroid-amanda-lepore.jpg","Amanda Lepore",5,3),
"s06e08":("polaroid-william-norwich.jpg","William Norwich",6,8),
"s02e06":("polaroid-michael-schmidt.jpg","Michael Schmidt",2,6),
"s01e04":("polaroid-peter-gatien.jpg","Peter Gatien",1,4),
"s02e04":("polaroid-nikki-haskell.jpg","Nikki Haskell",2,4),
"s06e07":("polaroid-sally-randall.jpg","Sally Randall",6,7),
"s01e10":("polaroid-joey-arias.jpg","Joey Arias",1,10),
"s03e08":("polaroid-larry-tee.jpg","Larry Tee",3,8),
"s04e04":("polaroid-zaldy.jpg","Zaldy",4,4),
"s02e01":("polaroid-michelle-visage.jpg","Michelle Visage",2,1),
"s01e06":("polaroid-waltpaper.jpg","Waltpaper",1,6),
"s02e07":("polaroid-jenny-talia.jpg","Jenny Talia",2,7),
"s02e05":("polaroid-connie-fleming.jpg","Connie Fleming",2,5)}
for k,(f,g,s,e) in EP.items():
    im=Image.open(A+f)
    if f.startswith(("block-", "polaroid-")):  # square portrait: blurred cover background + portrait on the right
        bg=cover(im).filter(ImageFilter.GaussianBlur(24)); p=im.convert("RGB").resize((H,H)); bg.paste(p,(W-H,0)); im=bg
    else: im=cover(im,0.6)
    label(im,f"NIGHT FEVER · SEASON {s} · EPISODE {e}",g,"Every name, place and look - timestamped").save(O+k+".jpg",quality=84,optimize=True,progressive=True)
PG={"home":("hero-people.jpg","NIGHT FEVER FAN PAGE","Every name, place and story","The World of Wonder nightlife podcast, indexed"),
"episodes":("episodes-reference-collage-refined.jpg","NIGHT FEVER FAN PAGE","The Afterparty","Every episode, every reference"),
"explore":("explore-header.jpg","NIGHT FEVER FAN PAGE","Everything A–Z","Every person, club, song and look"),
"guests":("guests-header.jpg","NIGHT FEVER FAN PAGE","The guests","Nightlife legends of the 70s, 80s, 90s and beyond"),
"timeline":("timeline-header.jpg","NIGHT FEVER FAN PAGE","The Timeline","New York nightlife, decade by decade"),
"library":("book-club-header.jpg","NIGHT FEVER FAN PAGE","The Library","Every book and magazine the guests mention"),
"jukebox":("jukebox-header.jpg","NIGHT FEVER FAN PAGE","The Jukebox","Every song and band the guests mention"),
"guestbook":("guestbook-header.jpg","NIGHT FEVER FAN PAGE","The Guestbook","Leave a note for the Afterparty"),
"wardrobe":("wardrobe-header.jpg","NIGHT FEVER FAN PAGE","The Wardrobe","Dress like the guests - 700 looks from the stories")}
for k,(f,kick,t,sub) in PG.items():
    label(cover(Image.open(A+f)),kick,t,sub).save(O+k+".jpg",quality=84,optimize=True,progressive=True)
print(sorted(os.listdir(O)), sum(os.path.getsize(O+x) for x in os.listdir(O))//1024,"KB")
